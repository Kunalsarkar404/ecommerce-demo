const express = require('express');
const Product = require('../models/Product');
const mongoose = require('mongoose');

const productRoutes = express.Router();

// Add a new product
productRoutes.post('/products', async (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    try {
        const newProduct = new Product({
            name,
            price,
            image: image || null
        });
        
        await newProduct.save();
        
        res.status(201).json({
            message: 'Product added successfully',
            product: newProduct
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
});

// Get all products
productRoutes.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

module.exports = productRoutes;