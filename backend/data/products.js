const products = [
    // Featured Products
    {
        id: 1,
        name: "Classic Linen Shirt",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
        category: "Men",
        details: {
            material: "100% Premium Linen",
            care: "Machine Wash Cold",
            fit: "Regular Fit",
            sustainable: "Yes"
        },
        offers: [
            { code: "WELCOME10", description: "Save 10% on your first order" },
            { code: "SUMMER20", description: "Flat 20% off on Summer Collection" }
        ],
        tags: ['featured']
    },
    {
        id: 2,
        name: "Elegant Silk Dress",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80",
        category: "Women",
        details: {
            material: "100% Pure Silk",
            care: "Dry Clean Only",
            fit: "Slim Fit",
            sustainable: "No"
        },
        offers: [
            { code: "ELEGANCE15", description: "15% off on Silk Collection" }
        ],
        tags: ['featured']
    },
    {
        id: 3,
        name: "Premium Leather Bag",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
        category: "Accessories",
        details: {
            material: "Genuine Italian Leather",
            care: "Wipe with Clean Dry Cloth",
            fit: "N/A",
            sustainable: "Yes"
        },
        tags: ['featured']
    },
    {
        id: 4,
        name: "Tailored Blazer",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
        category: "Women",
        details: {
            material: "Wool Blend",
            care: "Dry Clean Recommended",
            fit: "Tailored Fit",
            sustainable: "No"
        },
        offers: [
            { code: "FORMAL20", description: "Get 20% off on Formal Wear" }
        ],
        tags: ['featured']
    },
    {
        id: 17,
        name: "Kids Denim Jacket",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80",
        category: "Kids",
        details: {
            material: "98% Cotton, 2% Elastane",
            care: "Machine Wash Warm",
            fit: "Relaxed Fit",
            sustainable: "Yes"
        },
        tags: ['featured']
    },
    {
        id: 18,
        name: "Boys Graphic Tee",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80",
        category: "Kids",
        details: {
            material: "100% Organic Cotton",
            care: "Machine Wash Cold",
            fit: "Regular Fit",
            sustainable: "Yes"
        },
        offers: [
            { code: "KIDS10", description: "Extra 10% off on Kids Basics" }
        ],
        tags: ['featured']
    },

    // New Arrivals
    {
        id: 5,
        name: "Cashmere Sweater",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
        category: "Women",
        badge: "New",
        details: {
            material: "100% Cashmere",
            care: "Hand Wash Only",
            fit: "Loose Fit",
            sustainable: "Yes"
        },
        tags: ['new']
    },
    {
        id: 6,
        name: "Denim Jacket",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
        category: "Men",
        badge: "New",
        details: {
            material: "100% Cotton Denim",
            care: "Machine Wash Cold",
            fit: "Classic Fit",
            sustainable: "Yes"
        },
        tags: ['new']
    },
    {
        id: 7,
        name: "Summer Maxi Dress",
        price: 119.99,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
        category: "Women",
        badge: "New",
        details: {
            material: "Rayon Viscose",
            care: "Hand Wash Cold",
            fit: "Flowy Fit",
            sustainable: "Yes"
        },
        offers: [
            { code: "SUNNY25", description: "25% off on Summer Styles" }
        ],
        tags: ['new']
    },
    {
        id: 8,
        name: "Sneakers Collection",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80",
        category: "Shoes",
        badge: "New",
        details: {
            material: "Suede & Mesh Upper",
            care: "Wipe Clean",
            fit: "True to Size",
            sustainable: "Partially"
        },
        tags: ['new']
    },
    {
        id: 9,
        name: "Wool Coat",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80",
        category: "Men",
        badge: "New",
        details: {
            material: "80% Wool, 20% Polyester",
            care: "Dry Clean Only",
            fit: "Oversized Fit",
            sustainable: "No"
        },
        tags: ['new']
    },
    {
        id: 10,
        name: "Crossbody Bag",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80",
        category: "Accessories",
        badge: "New",
        details: {
            material: "Synthetic Leather",
            care: "Wipe with Damp Cloth",
            fit: "Adjustable Strap",
            sustainable: "Yes"
        },
        tags: ['new']
    },
    {
        id: 19,
        name: "Girls Summer Dress",
        price: 44.99,
        image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&q=80",
        category: "Kids",
        badge: "New",
        details: {
            material: "100% Cotton",
            care: "Machine Wash Gentle",
            fit: "Standard Fit",
            sustainable: "Yes"
        },
        tags: ['new']
    },
    {
        id: 20,
        name: "Kids Sneakers",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&q=80",
        category: "Kids",
        badge: "New",
        details: {
            material: "Canvas Upper",
            care: "Machine Washable",
            fit: "Velcro Strap",
            sustainable: "Yes"
        },
        tags: ['new']
    },

    // Best Sellers
    {
        id: 11,
        name: "White Cotton Tee",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
        category: "Men",
        badge: "Best Seller",
        details: {
            material: "100% Supima Cotton",
            care: "Machine Wash Cold",
            fit: "Regular Fit",
            sustainable: "Yes"
        },
        tags: ['best-seller']
    },
    {
        id: 12,
        name: "Black Skinny Jeans",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
        category: "Women",
        badge: "Best Seller",
        details: {
            material: "Denim with Stretch",
            care: "Machine Wash Cold Inside Out",
            fit: "Skinny Fit",
            sustainable: "No"
        },
        tags: ['best-seller']
    },
    {
        id: 13,
        name: "Leather Wallet",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
        category: "Accessories",
        badge: "Best Seller",
        details: {
            material: "Full Grain Leather",
            care: "Use Leather Conditioner",
            fit: "Compact",
            sustainable: "Yes"
        },
        tags: ['best-seller']
    },
    {
        id: 14,
        name: "Striped Polo Shirt",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80",
        category: "Men",
        badge: "Best Seller",
        details: {
            material: "Cotton Pique",
            care: "Machine Wash Warm",
            fit: "Slim Fit",
            sustainable: "Yes"
        },
        offers: [
            { code: "POLO15", description: "Buy 2 Get 15% Off" }
        ],
        tags: ['best-seller']
    },
    {
        id: 15,
        name: "Floral Blouse",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=400&q=80",
        category: "Women",
        badge: "Best Seller",
        details: {
            material: "Chiffon",
            care: "Gentle Cycle",
            fit: "Relaxed Fit",
            sustainable: "No"
        },
        tags: ['best-seller']
    },
    {
        id: 16,
        name: "Canvas Sneakers",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80",
        category: "Shoes",
        badge: "Best Seller",
        details: {
            material: "Canvas & Rubber",
            care: "Spot Clean",
            fit: "Wide Fit Available",
            sustainable: "Yes"
        },
        tags: ['best-seller']
    },
    {
        id: 21,
        name: "Kids Hoodie",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80",
        category: "Kids",
        badge: "Best Seller",
        details: {
            material: "Cotton Fleece",
            care: "Machine Wash Cold",
            fit: "Regular Fit",
            sustainable: "Yes"
        },
        tags: ['best-seller']
    },
    {
        id: 22,
        name: "Girls Leggings",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&q=80",
        category: "Kids",
        badge: "Best Seller",
        details: {
            material: "95% Cotton, 5% Spandex",
            care: "Machine Wash Cold",
            fit: "Tight Fit",
            sustainable: "Yes"
        },
        tags: ['best-seller']
    },
];

module.exports = products;
