require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Import models
const User = require('../models/User')
const Farmer = require('../models/Farmer')
const Agent = require('../models/Agent')
const Buyer = require('../models/Buyer')
const Transporter = require('../models/Transporter')
const Crop = require('../models/Crop')
const Cluster = require('../models/Cluster')
const Order = require('../models/Order')
const Shipment = require('../models/Shipment')
const TransportJob = require('../models/TransportJob')
const MandiPrice = require('../models/MandiPrice')

const connectDB = require('../config/db')

const seedData = async () => {
    try {
        await connectDB()
        console.log('📦 Connected to database')

        // Clear existing data
        await User.deleteMany({})
        await Farmer.deleteMany({})
        await Agent.deleteMany({})
        await Buyer.deleteMany({})
        await Transporter.deleteMany({})
        await Crop.deleteMany({})
        await Cluster.deleteMany({})
        await Order.deleteMany({})
        await Shipment.deleteMany({})
        await TransportJob.deleteMany({})
        await MandiPrice.deleteMany({})
        console.log('🗑️ Cleared existing data')

        // Create Admin User
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@agrilink.com',
            password: 'admin123',
            role: 'admin',
            phone: '+919999999999',
            isApproved: true
        })
        console.log('✅ Created admin user:', adminUser.email)

        // Create 2 Agents
        const agent1 = await User.create({
            name: 'Agent Rajesh',
            email: 'agent1@agrilink.com',
            password: 'agent123',
            role: 'agent',
            phone: '+919888888881',
            isApproved: true
        })
        const agentProfile1 = await Agent.create({
            userId: agent1._id,
            district: 'Rajkot',
            state: 'Gujarat',
            totalFarmersManaged: 0
        })

        const agent2 = await User.create({
            name: 'Agent Amit',
            email: 'agent2@agrilink.com',
            password: 'agent123',
            role: 'agent',
            phone: '+919888888882',
            isApproved: true
        })
        const agentProfile2 = await Agent.create({
            userId: agent2._id,
            district: 'Ahmedabad',
            state: 'Gujarat',
            totalFarmersManaged: 0
        })
        console.log('✅ Created 2 agents')

        // Create 8 Farmers (4 per agent)
        const farmerData = [
            { name: 'Farmer Rameshbhai', village: 'Dhoraji', district: 'Rajkot', state: 'Gujarat', lat: 22.2, lng: 70.5 },
            { name: 'Farmer Bhikhabhai', village: 'Gondal', district: 'Rajkot', state: 'Gujarat', lat: 22.3, lng: 70.8 },
            { name: 'Farmer Jagjivan', village: 'Jetpur', district: 'Rajkot', state: 'Gujarat', lat: 22.1, lng: 70.4 },
            { name: 'Farmer Laxmanbhai', village: 'Kotda', district: 'Rajkot', state: 'Gujarat', lat: 22.4, lng: 70.6 },
            { name: 'Farmer Sureshbhai', village: 'Sanand', district: 'Ahmedabad', state: 'Gujarat', lat: 22.9, lng: 72.5 },
            { name: 'Farmer Dilipbhai', village: 'Bopal', district: 'Ahmedabad', state: 'Gujarat', lat: 22.8, lng: 72.4 },
            { name: 'Farmer Vinodbhai', village: 'Kheda', district: 'Ahmedabad', state: 'Gujarat', lat: 22.7, lng: 72.6 },
            { name: 'Farmer Pravinbhai', village: 'Dholka', district: 'Ahmedabad', state: 'Gujarat', lat: 22.6, lng: 72.4 },
        ]

        const farmers = []
        for (let i = 0; i < 4; i++) {
            const user = await User.create({
                name: farmerData[i].name,
                email: `farmer${i + 1}@agrilink.com`,
                password: 'farmer123',
                role: 'farmer',
                phone: `+919777777${String(i + 1).padStart(4, '0')}`,
                isApproved: true
            })
            const farmer = await Farmer.create({
                userId: user._id,
                village: farmerData[i].village,
                district: farmerData[i].district,
                state: farmerData[i].state,
                location: { type: 'Point', coordinates: [farmerData[i].lng, farmerData[i].lat] },
                agentId: agent1._id,
                totalCropsListed: 0,
                rating: 4 + Math.random(),
                isDirectUser: true
            })
            farmers.push({ user, farmer, agent: agent1 })
        }
        for (let i = 4; i < 8; i++) {
            const user = await User.create({
                name: farmerData[i].name,
                email: `farmer${i + 1}@agrilink.com`,
                password: 'farmer123',
                role: 'farmer',
                phone: `+919777777${String(i + 1).padStart(4, '0')}`,
                isApproved: true
            })
            const farmer = await Farmer.create({
                userId: user._id,
                village: farmerData[i].village,
                district: farmerData[i].district,
                state: farmerData[i].state,
                location: { type: 'Point', coordinates: [farmerData[i].lng, farmerData[i].lat] },
                agentId: agent2._id,
                totalCropsListed: 0,
                rating: 4 + Math.random(),
                isDirectUser: true
            })
            farmers.push({ user, farmer, agent: agent2 })
        }
        console.log('✅ Created 8 farmers')

        // Update agent counts
        await Agent.findByIdAndUpdate(agentProfile1._id, { totalFarmersManaged: 4 })
        await Agent.findByIdAndUpdate(agentProfile2._id, { totalFarmersManaged: 4 })

        // Create 12 Crops
        const cropData = [
            { name: 'Tomato', variety: 'Cherry', qty: 500, price: 25, farmerIdx: 0 },
            { name: 'Tomato', variety: 'Desi', qty: 600, price: 22, farmerIdx: 1 },
            { name: 'Tomato', variety: 'Hybrid', qty: 400, price: 24, farmerIdx: 2 },
            { name: 'Onion', variety: 'Red', qty: 800, price: 18, farmerIdx: 3 },
            { name: 'Onion', variety: 'White', qty: 700, price: 20, farmerIdx: 4 },
            { name: 'Potato', variety: 'Kufri', qty: 1000, price: 15, farmerIdx: 5 },
            { name: 'Potato', variety: 'Local', qty: 800, price: 14, farmerIdx: 6 },
            { name: 'Wheat', variety: 'GW-496', qty: 2000, price: 22, farmerIdx: 7 },
            { name: 'Wheat', variety: 'Lok-1', qty: 1800, price: 21, farmerIdx: 0 },
            { name: 'Cotton', variety: 'Bt-Cotton', qty: 500, price: 65, farmerIdx: 1 },
            { name: 'Soybean', variety: 'JS-335', qty: 600, price: 48, farmerIdx: 2 },
            { name: 'Maize', variety: 'Hybrid', qty: 900, price: 19, farmerIdx: 3 },
        ]

        const crops = []
        for (const c of cropData) {
            const crop = await Crop.create({
                farmerId: farmers[c.farmerIdx].user._id,
                agentId: farmers[c.farmerIdx].agent._id,
                cropName: c.name,
                variety: c.variety,
                quantityKg: c.qty,
                pricePerKg: c.price,
                harvestDate: new Date('2024-03-15'),
                availableFrom: new Date('2024-03-16'),
                availableTill: new Date('2024-04-15'),
                location: farmers[c.farmerIdx].farmer.location,
                village: farmers[c.farmerIdx].farmer.village,
                district: farmers[c.farmerIdx].farmer.district,
                state: farmers[c.farmerIdx].farmer.state,
                status: 'available',
                qualityGrade: ['A', 'B', 'A', 'A', 'B'][Math.floor(Math.random() * 5)],
                description: `Fresh ${c.variety} ${c.name} from ${farmers[c.farmerIdx].farmer.village}`
            })
            crops.push(crop)
        }
        console.log('✅ Created 12 crops')

        // Create Clusters
        const tomatoCrops = crops.filter(c => c.cropName === 'Tomato')
        const onionCrops = crops.filter(c => c.cropName === 'Onion')

        // Tomato Cluster (Rajkot)
        const tomatoCluster = await Cluster.create({
            cropName: 'Tomato',
            district: 'Rajkot',
            state: 'Gujarat',
            centerLocation: { type: 'Point', coordinates: [70.5, 22.2] },
            totalQuantityKg: tomatoCrops.reduce((sum, c) => sum + c.quantityKg, 0),
            cropIds: tomatoCrops.map(c => c._id),
            farmerIds: tomatoCrops.map(c => c.farmerId),
            harvestWindowStart: new Date('2024-03-15'),
            harvestWindowEnd: new Date('2024-03-25'),
            averagePricePerKg: 24,
            status: 'open',
            radius: 20
        })

        // Update crops to be in cluster
        await Crop.updateMany(
            { _id: { $in: tomatoCrops.map(c => c._id) } },
            { clusterId: tomatoCluster._id, status: 'in_cluster' }
        )

        // Onion Cluster (Ahmedabad)
        const onionCluster = await Cluster.create({
            cropName: 'Onion',
            district: 'Ahmedabad',
            state: 'Gujarat',
            centerLocation: { type: 'Point', coordinates: [72.5, 22.9] },
            totalQuantityKg: onionCrops.reduce((sum, c) => sum + c.quantityKg, 0),
            cropIds: onionCrops.map(c => c._id),
            farmerIds: onionCrops.map(c => c.farmerId),
            harvestWindowStart: new Date('2024-03-10'),
            harvestWindowEnd: new Date('2024-03-20'),
            averagePricePerKg: 19,
            status: 'open',
            radius: 20
        })

        await Crop.updateMany(
            { _id: { $in: onionCrops.map(c => c._id) } },
            { clusterId: onionCluster._id, status: 'in_cluster' }
        )
        console.log('✅ Created 2 clusters')

        // Create 2 Buyers
        const buyer1 = await User.create({
            name: 'Bharat Supermart',
            email: 'buyer1@agrilink.com',
            password: 'buyer123',
            role: 'buyer',
            phone: '+919666666661',
            isApproved: true
        })
        const buyerProfile1 = await Buyer.create({
            userId: buyer1._id,
            businessName: 'Bharat Supermart',
            businessType: 'supermarket',
            address: 'SG Highway, Ahmedabad',
            gstNumber: '24AABCU9603R1ZM'
        })

        const buyer2 = await User.create({
            name: 'Fresh Veggies Co',
            email: 'buyer2@agrilink.com',
            password: 'buyer123',
            role: 'buyer',
            phone: '+919666666662',
            isApproved: true
        })
        const buyerProfile2 = await Buyer.create({
            userId: buyer2._id,
            businessName: 'Fresh Veggies Co',
            businessType: 'wholesaler',
            address: 'Prahlad Nagar, Ahmedabad',
            gstNumber: '24AABCU9603R2ZN'
        })
        console.log('✅ Created 2 buyers')

        // Create 1 Transporter
        const transporter1 = await User.create({
            name: 'Ravi Transport',
            email: 'transporter@agrilink.com',
            password: 'transporter123',
            role: 'transporter',
            phone: '+919555555551',
            isApproved: true
        })
        const transporterProfile = await Transporter.create({
            userId: transporter1._id,
            vehicleType: 'truck',
            vehicleNumber: 'GJ-15-AB-1234',
            capacityKg: 5000,
            location: { type: 'Point', coordinates: [70.9, 22.3] },
            isAvailable: true
        })
        console.log('✅ Created 1 transporter')

        // Create 3 Orders
        const order1 = await Order.create({
            buyerId: buyer1._id,
            clusterId: tomatoCluster._id,
            quantityKg: 500,
            pricePerKg: 24,
            totalAmount: 12000,
            status: 'confirmed',
            paymentStatus: 'escrow',
            deliveryAddress: 'SG Highway, Ahmedabad',
            notes: 'Urgent delivery required'
        })

        const order2 = await Order.create({
            buyerId: buyer2._id,
            clusterId: onionCluster._id,
            quantityKg: 300,
            pricePerKg: 19,
            totalAmount: 5700,
            status: 'pending',
            paymentStatus: 'pending',
            deliveryAddress: 'Prahlad Nagar, Ahmedabad'
        })

        const order3 = await Order.create({
            buyerId: buyer1._id,
            cropId: crops[5]._id,
            quantityKg: 200,
            pricePerKg: 15,
            totalAmount: 3000,
            status: 'delivered',
            paymentStatus: 'released',
            deliveryAddress: 'SG Highway, Ahmedabad'
        })
        console.log('✅ Created 3 orders')

        // Create Shipments
        const shipment1 = await Shipment.create({
            orderId: order1._id,
            transporterId: transporter1._id,
            status: 'assigned',
            pickupAddress: 'Dhoraji, Rajkot',
            deliveryAddress: 'SG Highway, Ahmedabad',
            estimatedDelivery: new Date('2024-03-18')
        })

        const shipment3 = await Shipment.create({
            orderId: order3._id,
            transporterId: transporter1._id,
            status: 'delivered',
            pickupAddress: 'Sanand, Ahmedabad',
            deliveryAddress: 'SG Highway, Ahmedabad',
            estimatedDelivery: new Date('2024-03-10'),
            actualDelivery: new Date('2024-03-10'),
            trackingUpdates: [
                { status: 'assigned', message: 'Shipment assigned', timestamp: new Date('2024-03-08') },
                { status: 'picked_up', message: 'Package picked up', timestamp: new Date('2024-03-09') },
                { status: 'in_transit', message: 'In transit to destination', timestamp: new Date('2024-03-10') },
                { status: 'delivered', message: 'Delivered successfully', timestamp: new Date('2024-03-10') }
            ]
        })
        console.log('✅ Created 2 shipments')

        // Create Transport Jobs
        const transportJob1 = await TransportJob.create({
            shipmentId: shipment1._id,
            orderId: order1._id,
            pickupLocation: { type: 'Point', coordinates: [70.5, 22.2] },
            deliveryLocation: { type: 'Point', coordinates: [72.5, 22.9] },
            distanceKm: 220,
            payAmount: 3500,
            requiredCapacityKg: 500,
            status: 'accepted',
            acceptedBy: transporter1._id,
            stops: [
                { location: { type: 'Point', coordinates: [70.5, 22.2] }, farmerName: 'Farmer Rameshbhai', quantityKg: 500, address: 'Dhoraji, Rajkot' }
            ],
            cropName: 'Tomato',
            vehicleTypeRequired: 'truck'
        })
        console.log('✅ Created 1 transport job')

        // Create Mandi Prices (last 30 days for 10 crops)
        const cropsForPrices = ['Tomato', 'Onion', 'Potato', 'Wheat', 'Rice', 'Maize', 'Cotton', 'Soybean', 'Groundnut', 'Chilli']
        const districts = ['Rajkot', 'Ahmedabad', 'Surat', 'Bhavnagar', 'Vadodara']

        for (const cropName of cropsForPrices) {
            for (const district of districts) {
                const basePrice = {
                    'Tomato': 22, 'Onion': 18, 'Potato': 14, 'Wheat': 21, 'Rice': 26,
                    'Maize': 18, 'Cotton': 60, 'Soybean': 45, 'Groundnut': 50, 'Chilli': 35
                }[cropName] || 20

                for (let i = 0; i < 30; i++) {
                    const date = new Date()
                    date.setDate(date.getDate() - i)

                    const variation = (Math.random() - 0.5) * 6
                    const modalPrice = basePrice + variation

                    await MandiPrice.create({
                        cropName,
                        market: `${district} Mandi`,
                        district,
                        state: 'Gujarat',
                        minPrice: Math.round(modalPrice * 0.85),
                        maxPrice: Math.round(modalPrice * 1.15),
                        modalPrice: Math.round(modalPrice),
                        date,
                        unit: 'quintal'
                    })
                }
            }
        }
        console.log('✅ Created mandi prices for last 30 days')

        console.log('\n🎉 Seed data created successfully!')
        console.log('\n📋 Login credentials:')
        console.log('   Admin: admin@agrilink.com / admin123')
        console.log('   Agent: agent1@agrilink.com / agent123')
        console.log('   Farmer: farmer1@agrilink.com / farmer123')
        console.log('   Buyer: buyer1@agrilink.com / buyer123')
        console.log('   Transporter: transporter@agrilink.com / transporter123')

        process.exit(0)
    } catch (error) {
        console.error('❌ Error seeding data:', error.message)
        process.exit(1)
    }
}

seedData()
