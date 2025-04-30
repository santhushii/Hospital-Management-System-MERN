require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin'); // Ensure this path is correct

// MongoDB connection
mongoose.connect('mongodb+srv://admin:admin123@hospitalcluster.4d8rms4.mongodb.net/hmsDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error(' Could not connect to MongoDB:', err);
    process.exit(1);
  });

// Create admin user
async function createAdmin() {
  const admin = new Admin({
    firstName: "Santhushie",
    lastName: "Nallaperuma",
    email: "santhu@gmail.com",
    password: "admin123", // Consider hashing for production
    role: "admin"
  });

  try {
    await admin.save();
    console.log(' Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
