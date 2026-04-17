const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users.js');
const products = require('./data/products.js');
const User = require('./models/userModel');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        await Product.insertMany(products);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

