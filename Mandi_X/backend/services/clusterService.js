const Crop = require('../models/Crop');
const Cluster = require('../models/Cluster');
const cron = require('node-cron');

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

/**
 * Generate clusters for a specific crop and district
 * Groups crops within 20km of each other with overlapping harvest dates
 */
exports.generateClusters = async (cropName, district) => {
    try {
        // Get all available crops for this crop name and district
        const crops = await Crop.find({
            cropName: new RegExp(cropName, 'i'),
            district: new RegExp(district, 'i'),
            status: 'available',
            location: { $ne: null }
        });

        if (crops.length < 2) {
            console.log(`Not enough crops to form cluster: ${cropName} in ${district}`);
            return;
        }

        // Group crops by proximity (20km radius)
        const clusters = [];
        const assignedCropIds = new Set();

        for (let i = 0; i < crops.length; i++) {
            if (assignedCropIds.has(crops[i]._id.toString())) continue;

            const currentCrop = crops[i];
            const clusterCrops = [currentCrop];
            assignedCropIds.add(currentCrop._id.toString());

            const [currentLng, currentLat] = currentCrop.location.coordinates;

            // Find all crops within 20km with overlapping harvest dates (±3 days)
            for (let j = i + 1; j < crops.length; j++) {
                if (assignedCropIds.has(crops[j]._id.toString())) continue;

                const otherCrop = crops[j];
                const [otherLng, otherLat] = otherCrop.location.coordinates;

                const distance = calculateDistance(currentLat, currentLng, otherLat, otherLng);

                // Check harvest date overlap (±3 days)
                const dateDiff = Math.abs(
                    new Date(currentCrop.harvestDate) - new Date(otherCrop.harvestDate)
                ) / (1000 * 60 * 60 * 24);

                if (distance <= 20 && dateDiff <= 3) {
                    clusterCrops.push(otherCrop);
                    assignedCropIds.add(otherCrop._id.toString());
                }
            }

            // Minimum cluster: 2 farmers, 200kg
            const uniqueFarmers = new Set(clusterCrops.map(c => c.farmerId.toString()));
            const totalQuantity = clusterCrops.reduce((sum, c) => sum + c.quantityKg, 0);

            if (uniqueFarmers.size >= 2 && totalQuantity >= 200) {
                clusters.push(clusterCrops);
            }
        }

        // Create or update clusters
        for (const clusterCrops of clusters) {
            const totalQuantity = clusterCrops.reduce((sum, c) => sum + c.quantityKg, 0);
            const avgPrice = clusterCrops.reduce((sum, c) => sum + c.pricePerKg, 0) / clusterCrops.length;
            const farmerIds = [...new Set(clusterCrops.map(c => c.farmerId))];

            // Get center location
            const centerLat = clusterCrops.reduce((sum, c) => sum + c.location.coordinates[1], 0) / clusterCrops.length;
            const centerLng = clusterCrops.reduce((sum, c) => sum + c.location.coordinates[0], 0) / clusterCrops.length;

            // Check if cluster already exists
            const existingCluster = await Cluster.findOne({
                cropName: clusterCrops[0].cropName,
                district: clusterCrops[0].district,
                status: 'open'
            });

            if (existingCluster) {
                // Update existing cluster
                existingCluster.cropIds = clusterCrops.map(c => c._id);
                existingCluster.farmerIds = farmerIds;
                existingCluster.totalQuantityKg = totalQuantity;
                existingCluster.averagePricePerKg = avgPrice;
                existingCluster.harvestWindowStart = new Date(
                    Math.min(...clusterCrops.map(c => new Date(c.harvestDate)))
                );
                existingCluster.harvestWindowEnd = new Date(
                    Math.max(...clusterCrops.map(c => new Date(c.harvestDate)))
                );
                existingCluster.centerLocation = {
                    type: 'Point',
                    coordinates: [centerLng, centerLat]
                };
                await existingCluster.save();
            } else {
                // Create new cluster
                const cluster = await Cluster.create({
                    cropName: clusterCrops[0].cropName,
                    district: clusterCrops[0].district,
                    state: clusterCrops[0].state,
                    centerLocation: {
                        type: 'Point',
                        coordinates: [centerLng, centerLat]
                    },
                    totalQuantityKg: totalQuantity,
                    cropIds: clusterCrops.map(c => c._id),
                    farmerIds: farmerIds,
                    harvestWindowStart: new Date(
                        Math.min(...clusterCrops.map(c => new Date(c.harvestDate)))
                    ),
                    harvestWindowEnd: new Date(
                        Math.max(...clusterCrops.map(c => new Date(c.harvestDate)))
                    ),
                    averagePricePerKg: avgPrice,
                    status: 'open'
                });
            }

            // Update crop statuses
            for (const crop of clusterCrops) {
                crop.status = 'in_cluster';
                const clusterDoc = await Cluster.findOne({
                    cropIds: crop._id,
                    status: 'open'
                });
                if (clusterDoc) {
                    crop.clusterId = clusterDoc._id;
                }
                await crop.save();
            }
        }

        console.log(`Generated ${clusters.length} clusters for ${cropName} in ${district}`);
    } catch (error) {
        console.error('Error generating clusters:', error);
    }
};

/**
 * Remove a crop from its cluster
 */
exports.removeCropFromCluster = async (cropId) => {
    try {
        const cluster = await Cluster.findOne({
            cropIds: cropId,
            status: 'open'
        });

        if (!cluster) return;

        // Remove crop from cluster
        cluster.cropIds = cluster.cropIds.filter(id => id.toString() !== cropId.toString());

        // Get updated crops
        const crops = await Crop.find({ _id: { $in: cluster.cropIds } });

        if (crops.length < 2) {
            // Dissolve cluster
            for (const crop of crops) {
                crop.status = 'available';
                crop.clusterId = null;
                await crop.save();
            }
            cluster.status = 'expired';
            await cluster.save();
            console.log(`Cluster ${cluster._id} dissolved`);
        } else {
            // Recalculate totals
            cluster.totalQuantityKg = crops.reduce((sum, c) => sum + c.quantityKg, 0);
            cluster.averagePricePerKg = crops.reduce((sum, c) => sum + c.pricePerKg, 0) / crops.length;
            cluster.farmerIds = [...new Set(crops.map(c => c.farmerId))];
            await cluster.save();
        }
    } catch (error) {
        console.error('Error removing crop from cluster:', error);
    }
};

/**
 * Get cluster by ID with populated details
 */
exports.getClusterById = async (clusterId) => {
    return await Cluster.findById(clusterId)
        .populate('cropIds')
        .populate('farmerIds', 'name phone village');
};

/**
 * Get all clusters (public)
 */
exports.getAllClusters = async (filters = {}) => {
    const query = { status: 'open' };

    if (filters.cropName) query.cropName = new RegExp(filters.cropName, 'i');
    if (filters.district) query.district = new RegExp(filters.district, 'i');
    if (filters.state) query.state = new RegExp(filters.state, 'i');

    return await Cluster.find(query)
        .populate('farmerIds', 'name village')
        .sort({ createdAt: -1 });
};

/**
 * Schedule cluster generation job
 * Runs every hour
 */
exports.scheduleClusterJob = () => {
    cron.schedule('0 * * * *', async () => {
        console.log('Running scheduled cluster generation...');

        // Get all unique crop names and districts with available crops
        const crops = await Crop.find({ status: 'available' }).distinct('cropName');
        const districts = await Crop.find({ status: 'available' }).distinct('district');

        // Generate clusters for each crop-district combination
        for (const cropName of crops) {
            for (const district of districts) {
                await exports.generateClusters(cropName, district);
            }
        }
    });

    console.log('Cluster generation job scheduled: runs every hour');
};

module.exports = exports;
