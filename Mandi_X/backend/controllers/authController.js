const jwt = require('jsonwebtoken');
const { z } = require('zod');
const User = require('../models/User');
const Farmer = require('../models/Farmer');
const Agent = require('../models/Agent');
const Buyer = require('../models/Buyer');
const Transporter = require('../models/Transporter');
const asyncHandler = require('../utils/asyncHandler');

// Zod validation schemas
const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['farmer', 'agent', 'buyer', 'transporter', 'admin']),
    phone: z.string().optional()
});

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
});

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};

// Send token response
const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user._id);

    const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isApproved: user.isApproved,
        profileImage: user.profileImage
    };

    res.status(statusCode).json({
        success: true,
        token,
        user: userData
    });
};

/**
 * @desc    Register user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res) => {
    // Validate request body
    const validatedData = registerSchema.parse(req.body);
    const { name, email, password, role, phone } = validatedData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'User with this email already exists'
        });
    }

    // Set isApproved based on role
    const isApproved = ['farmer', 'agent', 'admin'].includes(role);

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role,
        phone,
        isApproved
    });

    // Create role-specific profile
    switch (role) {
        case 'farmer':
            await Farmer.create({
                userId: user._id,
                isDirectUser: true
            });
            break;
        case 'agent':
            await Agent.create({
                userId: user._id
            });
            break;
        case 'buyer':
            await Buyer.create({
                userId: user._id
            });
            break;
        case 'transporter':
            await Transporter.create({
                userId: user._id
            });
            break;
        // admin doesn't need additional profile
    }

    // TODO: 2FA-ready placeholder - send OTP for future OTP support

    sendTokenResponse(user, 201, res);
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res) => {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    // Check if user is approved (for buyers and transporters)
    if (!user.isApproved && ['buyer', 'transporter'].includes(user.role)) {
        return res.status(403).json({
            success: false,
            message: 'Your account is pending approval by admin'
        });
    }

    sendTokenResponse(user, 200, res);
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/profile
 * @access  Private
 */
exports.getProfile = asyncHandler(async (req, res) => {
    const user = req.user;

    let profile = null;

    // Get role-specific profile
    switch (user.role) {
        case 'farmer':
            profile = await Farmer.findOne({ userId: user._id });
            break;
        case 'agent':
            profile = await Agent.findOne({ userId: user._id });
            break;
        case 'buyer':
            profile = await Buyer.findOne({ userId: user._id });
            break;
        case 'transporter':
            profile = await Transporter.findOne({ userId: user._id });
            break;
    }

    res.status(200).json({
        success: true,
        user,
        profile
    });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
exports.updateProfile = asyncHandler(async (req, res) => {
    const { name, phone, profileImage } = req.body;

    // Update user fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (profileImage) updateFields.profileImage = profileImage;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        updateFields,
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        user
    });
});

/**
 * @desc    Logout user / clear cookie
 * @route   POST /api/auth/logout
 * @access  Private
 */
exports.logout = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});
