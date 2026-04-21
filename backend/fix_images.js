const mongoose = require('mongoose');
const Product = require('./models/Product');
const https = require('https');
require('dotenv').config();

const checkUrl = (url) => {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).on('error', () => resolve(false));
    });
};

const itemsToFix = [
    {
        name: "Smart Home Speaker",
        urls: [
            "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&q=80",
            "https://images.unsplash.com/photo-1544335438-6b80155608c0?w=500&q=80",
            "https://images.pexels.com/photos/1000633/pexels-photo-1000633.jpeg?auto=compress&cs=tinysrgb&w=500" // Fallback
        ]
    },
    {
        name: "Women's Summer Dress",
        urls: [
            "https://images.unsplash.com/photo-1515347619152-ed2a868971f1?w=500&q=80",
            "https://images.unsplash.com/photo-1572804013309-8c98e046ae95?w=500&q=80",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80",
            "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=500"
        ]
    },
    {
        name: "Organic Honey 1kg",
        urls: [
            "https://images.unsplash.com/photo-1587049352851-8d4e89134cf3?w=500&q=80",
            "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=500&q=80",
            "https://images.pexels.com/photos/3334335/pexels-photo-3334335.jpeg?auto=compress&cs=tinysrgb&w=500"
        ]
    }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
    for (const item of itemsToFix) {
        let validUrl = item.urls[item.urls.length - 1]; // default to last fallback
        for (const url of item.urls) {
            if (await checkUrl(url)) {
                validUrl = url;
                break;
            }
        }
        console.log(`Setting ${item.name} to ${validUrl}`);
        await Product.updateOne({ name: item.name }, { $set: { image: validUrl } });
    }
    console.log("Images fixed!");
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
