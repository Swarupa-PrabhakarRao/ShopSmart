const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Place an order
router.post('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('products.productId');
    if (!cart || cart.products.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    let totalAmount = 0;
    const orderProducts = cart.products.map(p => {
      totalAmount += p.productId.price * p.quantity;
      return {
        productId: p.productId._id,
        quantity: p.quantity
      };
    });

    const order = new Order({
      userId: req.user.userId,
      products: orderProducts,
      totalAmount
    });

    await order.save();
    
    // Clear cart
    cart.products = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .populate('products.productId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (Mock Admin update)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel an order (User)
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    if (order.status === 'Cancelled' || order.status === 'Delivered') {
      return res.status(400).json({ message: 'Order cannot be cancelled in its current state' });
    }

    order.status = 'Cancelled';
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
