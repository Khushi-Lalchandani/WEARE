const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/userModel');

dotenv.config();
connectDB();

const makeAdmin = async () => {
    const email = process.argv[2];

    if (!email) {
        console.error('Please provide an email address as an argument.');
        process.exit(1);
    }

    try {
        const user = await User.findOne({ email });

        if (user) {
            user.isAdmin = true;
            await user.save();
            console.log(`User ${user.name} (${user.email}) is now an Admin!`);
            process.exit();
        } else {
            console.error('User not found!');
            process.exit(1);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

makeAdmin();
