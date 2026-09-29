import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";

dotenv.config();

const sampleProducts = [
	// Jeans
	{
		name: "Classic Slim Fit Denim",
		description: "Comfortable and durable slim fit denim jeans crafted from stretch cotton.",
		price: 49.99,
		image: "/jeans.jpg",
		category: "jeans",
		isFeatured: true,
	},
	{
		name: "Vintage Ripped Blue Jeans",
		description: "Trendy vintage washed jeans with subtle distressed detailing.",
		price: 59.99,
		image: "/jeans.jpg",
		category: "jeans",
		isFeatured: false,
	},
	{
		name: "Relaxed Fit Black Denim",
		description: "Versatile deep black relaxed fit jeans for everyday casual style.",
		price: 54.99,
		image: "/jeans.jpg",
		category: "jeans",
		isFeatured: false,
	},

	// T-shirts
	{
		name: "Organic Crewneck T-Shirt",
		description: "Breathable 100% organic cotton basic crewneck tee.",
		price: 24.99,
		image: "/tshirts.jpg",
		category: "t-shirts",
		isFeatured: true,
	},
	{
		name: "Urban Graphic Print Tee",
		description: "Soft cotton tee with minimalist aesthetic street graphics.",
		price: 29.99,
		image: "/tshirts.jpg",
		category: "t-shirts",
		isFeatured: false,
	},
	{
		name: "Premium Heather Grey Tee",
		description: "Ultra-soft blended fabric designed for comfort and everyday wear.",
		price: 21.99,
		image: "/tshirts.jpg",
		category: "t-shirts",
		isFeatured: false,
	},

	// Shoes
	{
		name: "Urban Low-Top Sneakers",
		description: "Modern minimalist streetwear sneakers with cushioned memory foam sole.",
		price: 89.99,
		image: "/shoes.jpg",
		category: "shoes",
		isFeatured: true,
	},
	{
		name: "Classic Leather Loafers",
		description: "Handcrafted genuine leather loafers for formal and semi-formal wear.",
		price: 119.99,
		image: "/shoes.jpg",
		category: "shoes",
		isFeatured: false,
	},
	{
		name: "All-Day Athletic Runners",
		description: "Lightweight and breathable running shoes with high traction grip.",
		price: 79.99,
		image: "/shoes.jpg",
		category: "shoes",
		isFeatured: false,
	},

	// Glasses
	{
		name: "Aviator Gold Sunglasses",
		description: "Timeless aviator sunglasses with UV400 polarized gradient lenses.",
		price: 39.99,
		image: "/glasses.png",
		category: "glasses",
		isFeatured: true,
	},
	{
		name: "Matte Black Wayfarers",
		description: "Durable lightweight acetate frames with glare-resistant dark lenses.",
		price: 34.99,
		image: "/glasses.png",
		category: "glasses",
		isFeatured: false,
	},

	// Jackets
	{
		name: "Classic Biker Leather Jacket",
		description: "Premium faux leather jacket with asymmetrical zip closure and silver hardware.",
		price: 149.99,
		image: "/jackets.jpg",
		category: "jackets",
		isFeatured: true,
	},
	{
		name: "Insulated Bomber Jacket",
		description: "Weather-resistant nylon bomber jacket with ribbed collar and cuffs.",
		price: 99.99,
		image: "/jackets.jpg",
		category: "jackets",
		isFeatured: false,
	},

	// Suits
	{
		name: "Navy Slim Fit 2-Piece Suit",
		description: "Tailored wool-blend two-piece suit suitable for business and weddings.",
		price: 229.99,
		image: "/suits.jpg",
		category: "suits",
		isFeatured: true,
	},
	{
		name: "Charcoal Formal Tuxedo",
		description: "Elegant charcoal tuxedo with satin lapels for black-tie occasions.",
		price: 269.99,
		image: "/suits.jpg",
		category: "suits",
		isFeatured: false,
	},

	// Bags
	{
		name: "Minimalist Leather Backpack",
		description: "Sleek water-resistant leather backpack with dedicated 15-inch laptop sleeve.",
		price: 79.99,
		image: "/bags.jpg",
		category: "bags",
		isFeatured: true,
	},
	{
		name: "Vintage Canvas Duffle Bag",
		description: "Spacious heavy-duty canvas travel duffle with leather trim accents.",
		price: 69.99,
		image: "/bags.jpg",
		category: "bags",
		isFeatured: false,
	},
];

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB...");

		await Product.deleteMany({});
		console.log("Cleared existing products.");

		const created = await Product.insertMany(sampleProducts);
		console.log(`Successfully seeded ${created.length} products!`);

		// Clear Redis cache so new featured products appear immediately
		try {
			await redis.del("featured_products");
			console.log("Redis cache cleared.");
		} catch (e) {
			console.log("Redis cache clear skipped:", e.message);
		}

		console.log("Seeding complete!");
		process.exit(0);
	} catch (error) {
		console.error("Seeding failed:", error);
		process.exit(1);
	}
}

seed();
