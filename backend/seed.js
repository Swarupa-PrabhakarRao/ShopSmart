require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 299.99,
        description: "High-fidelity audio with active noise cancellation and 30-hour battery life. Experience immersive sound quality and all-day comfort.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
    },
    {
        name: "Minimalist Smartwatch",
        category: "Accessories",
        price: 199.50,
        description: "Track your fitness, heart rate, and notifications with a sleek, minimalist design. Features a customizable watch face.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
    },
    {
        name: "Ergonomic Mechanical Keyboard",
        category: "Electronics",
        price: 149.00,
        description: "Tactile switches, customizable RGB lighting, and an ergonomic layout designed for professionals and avid gamers.",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80"
    },
    {
        name: "Classic Denim Jacket",
        category: "Clothing",
        price: 89.99,
        description: "Timeless denim jacket with a comfortable, relaxed fit. Perfect for layering in any season.",
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80"
    },
    {
        name: "Leather Messenger Bag",
        category: "Accessories",
        price: 120.00,
        description: "Genuine leather bag with spacious compartments for your laptop and daily essentials. Durable and extremely stylish.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"
    },
    {
        name: "Smart Home Speaker",
        category: "Electronics",
        price: 79.99,
        description: "Voice-controlled smart speaker with rich sound and built-in virtual assistant. Control your smart home effortlessly.",
        image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&q=80"
    },
    {
        name: "Women's Summer Dress",
        category: "Clothing",
        price: 45.00,
        description: "Lightweight, breathable floral summer dress perfect for warm days and casual outings.",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80"
    },
    {
        name: "Men's Casual Chinos",
        category: "Clothing",
        price: 55.00,
        description: "Comfortable and stylish cotton chinos. Versatile enough for the office or a weekend trip.",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80"
    },
    {
        name: "Organic Honey 1kg",
        category: "Groceries",
        price: 18.50,
        description: "Pure, raw, unfiltered organic honey harvested from local farms.",
        image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=500&q=80"
    },
    {
        name: "Artisan Roasted Coffee Beans",
        category: "Groceries",
        price: 24.00,
        description: "Freshly roasted single-origin Arabica coffee beans. Rich flavor with hints of chocolate and caramel.",
        image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80"
    }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopsmart')
.then(async () => {
    console.log("Connected to DB, dropping old products...");
    await Product.deleteMany({});
    
    console.log("Seeding new premium products...");
    await Product.insertMany(products);
    
    console.log("Seeding complete!");
    process.exit();
}).catch(err => {
    console.error(err);
    process.exit(1);
});
