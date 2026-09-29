# My E-Commerce Store 🛒

A full-stack MERN e-commerce application with secure authentication, payment integration, and admin dashboard.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Zustand, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Cache:** Redis (Upstash)
- **Payments:** Stripe
- **Image Storage:** Cloudinary
- **Auth:** JWT (Access + Refresh Tokens)

## Features

- 🔐 Secure Authentication (JWT with Refresh/Access Tokens)
- 📝 User Signup & Login
- 🛒 Shopping Cart
- 📦 Product & Category Management
- 💳 Stripe Payment Integration
- 🏷️ Coupon Code System
- 👑 Admin Dashboard
- 📊 Sales Analytics
- 🚀 Redis Caching

## Setup `.env` file

```bash
PORT=5000
MONGO_URI=your_mongo_uri

UPSTASH_REDIS_URL=your_redis_url

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Run Locally

```bash
# Install dependencies
npm install
cd frontend && npm install && cd ..

# Run backend (port 5000)
npm run dev

# Run frontend (port 5173)
cd frontend && npm run dev
```

## Build for Production

```bash
npm run build
npm run start
```
