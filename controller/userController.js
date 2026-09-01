const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        const { name, password, email, role, phone } = req.body;

        // Check existing email
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: 'User with email already exists'
            });
        }

        // Check existing phone number
        const existingPhone = await User.findOne({ phone });

        if (existingPhone) {
            return res.status(400).json({
                message: 'User with same phone number already exists'
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            password: passwordHash,
            email,
            role,
            phone
        });

        return res.status(201).json({
            message: 'User created successfully'
        });

    } catch (err) {
        console.log({ message: err.message });

        return res.status(500).json({
            message: 'Unable to create user'
        });
    }
};


// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check whether the email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        // Generate Token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        return res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });

    } catch (err) {
        console.log({ message: err.message });

        return res.status(500).json({
            message: err.message
        });
    }
};