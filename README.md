# ShopSmart E-Commerce Application

ShopSmart is a modern, full-stack e-commerce web application built to deliver a premium shopping experience. It features a responsive vanilla frontend and a robust Node.js/Express backend powered by MongoDB for secure, fast data management.

## 🚀 Features

- **User Authentication**: Secure login and registration using JSON Web Tokens (JWT).
- **Product Discovery**: Browse a premium selection of products with images and detailed descriptions.
- **Shopping Cart**: Real-time cart management allowing users to add, update, and remove items before checkout.
- **Order Management**: Users can place orders, view their order history, and track status.
- **Order Cancellations**: Dedicated interface to cancel active orders securely.
- **Interactive Dashboard**: A personalized dashboard that tracks Total Orders, Active Orders, and Cancelled Orders with dynamic filtering.
- **Responsive Design**: A sleek, accessible, and intuitive UI built with pure HTML, CSS, and Vanilla JavaScript.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Custom Variables, Flexbox/Grid), Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Security**: JWT for Authentication, bcryptjs for password hashing

## 📂 Project Structure

```
ShopSmart/
├── backend/
│   ├── middleware/      # JWT Auth validation
│   ├── models/          # Mongoose Schemas (User, Product, Cart, Order)
│   ├── routes/          # Express API routes
│   ├── seed.js          # Database seed script for initial dummy data
│   ├── server.js        # Main Express server entry point
│   └── .env             # Environment variables
├── frontend/
│   ├── index.html       # Landing Page
│   ├── products.html    # Product Catalog
│   ├── dashboard.html   # User Profile & Order tracking
│   ├── cart.html        # Shopping Cart
│   ├── css/             # Stylesheets
│   └── js/              # Frontend API configurations and logic
└── README.md
```

## ⚙️ Local Setup & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Swarupa-PrabhakarRao/ShopSmart.git
cd ShopSmart
```

### 2. Configure Backend
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and configure your environment variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Seed Database (Optional)
If you want to populate your database with dummy products, run the seeder script:
```bash
node seed.js
```

### 4. Run the Project
Start the backend server:
```bash
node server.js
```

In a separate terminal, serve the frontend from the root project directory. You can use any local HTTP server, for example:
```bash
npx serve -l 3000 frontend
```

Now, open `http://localhost:3000` in your browser to view the app!

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
