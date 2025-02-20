const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Remove SSL-specific options and let MongoDB driver handle it
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    // Try to connect without SSL first
    try {
      await mongoose.connect(process.env.MONGODB_URI, options);
    } catch (initialError) {
      console.log('Attempting connection with SSL settings...');
      // If first attempt fails, try with SSL settings
      options.ssl = true;
      options.tls = true;
      options.tlsAllowInvalidCertificates = true; // Only for development
      await mongoose.connect(process.env.MONGODB_URI, options);
    }

    console.log('MongoDB Atlas Connected');
  } catch (err) {
    console.error('MongoDB connection error details:', {
      name: err.name,
      message: err.message,
      code: err.code,
      stack: err.stack
    });
    process.exit(1);
  }
};

module.exports = connectDB;
