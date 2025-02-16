const bcrypt = require('bcrypt');
const User = require('../models/User');
const express = require('express');

const signupRoutes = express.Router();

signupRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Validate inputs
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists.' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save user to MongoDB
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: 'Signup successful!' });
    } catch (err) {
        console.error('Error during signup:', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});
    
module.exports = signupRoutes;