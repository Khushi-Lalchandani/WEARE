const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();

// Connect to MongoDB
connectDB();

const createNewAdmin = async () => {
    try {
        const adminEmail = 'khushi@admin.com';
        
        // Check if admin already exists to prevent duplicate key errors
        const existingUser = await User.findOne({ email: adminEmail });
        
        if (existingUser) {
            console.log(`User ${adminEmail} already exists. Deleting so we can recreate it fresh...`);
            await User.deleteOne({ email: adminEmail });
        }

        // Create new Admin User object
        const adminUser = new User({
            name: 'Khushi Admin',
            email: adminEmail,
            password: 'SecureAdmin123!', // The userModel.js pre-save hook will perfectly hash this!
            isAdmin: true,
        });

        const createdAdmin = await adminUser.save();
        console.log('✅ Success! New Admin specifically generated for Khushi.');
        console.log(`Login Email: ${createdAdmin.email}`);
        console.log(`Password: SecureAdmin123!`);
        console.log(`The password was safely encrypted in MongoDB automatically.`);
        
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

createNewAdmin();
