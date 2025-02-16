const express = require('express')
const Cart = require('../models/Cart');

const cartRoutes = express.Router();

cartRoutes.post('/cart', async (req, res) => {
    const {userId, productId, name, price} = req.body;

    if(!userId){
        return res.status(401).json({error: 'User not logged in'});
    }
    try {
        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({userId, items: []});
        }
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else{
            cart.items.push({productId, name, price, quantity: 1});
        }
        await cart.save()
        res.status(200).json({message: 'Item added to cart successfully', cart});
    } catch (error) {
        console.log('Error adding to cart:', error);
        res.status(500).json({error: 'Internal server error.'});
    }
})


module.exports = cartRoutes;