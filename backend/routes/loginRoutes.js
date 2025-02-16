const bcrypt = require('bcrypt');
const express = require('express')
const User = require('../models/User');

const loginRoutes = express.Router();

loginRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.status(200).json({ message: 'Login successful!' });
        } else {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
    } catch (err) {
        console.log('Error during signup', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
})


module.exports = loginRoutes;