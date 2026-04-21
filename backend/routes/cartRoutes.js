const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Get user cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.userId }).populate('products.productId');
    if (!cart) cart = await Cart.create({ userId: req.user.userId, products: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add to cart
router.post('/', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user.userId });
    
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, products: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.products[itemIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }
    
    await cart.save();
    cart = await cart.populate('products.productId');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update item quantity
router.put('/:productId', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.products.findIndex(p => p.productId.toString() === req.params.productId);
    if (itemIndex > -1) {
      cart.products[itemIndex].quantity = quantity;
      await cart.save();
      const updatedCart = await Cart.findOne({ userId: req.user.userId }).populate('products.productId');
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove item from cart
router.delete('/:productId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.products = cart.products.filter(p => p.productId.toString() !== req.params.productId);
    await cart.save();
    
    const updatedCart = await Cart.findOne({ userId: req.user.userId }).populate('products.productId');
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
