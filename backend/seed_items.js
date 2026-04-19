const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ItemListing = require('./models/ItemListing');
const User = require('./models/User');

dotenv.config();

async function seedItems() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB");

  let donor = await User.findOne({ role: 'donor' });
  if (!donor) {
    donor = await User.create({
      name: 'Sample Donor',
      email: 'donor@servex.org',
      password: 'password123',
      role: 'donor',
      phone: '8888000000',
      location: { city: 'Mumbai' }
    });
    console.log("Created a sample donor.");
  }

  await ItemListing.deleteMany({});

  const items = [
    { donorId: donor._id, category: 'food', quantity: '50 packets', description: 'Rice, lentils, basic spices.', recipients: ['homeless'], tone: 'urgent', pickupInfo: 'South Delhi', city: 'Delhi', aiPrompt: '50 emergency food ration kits', status: 'Available' },
    { donorId: donor._id, category: 'books', quantity: '200 books', description: 'High school maths books.', recipients: ['children'], tone: 'warm', pickupInfo: 'Bandra', city: 'Mumbai', aiPrompt: '200 science and math texts', status: 'Available' },
    { donorId: donor._id, category: 'medicine', quantity: '100 kits', description: 'Basic first-aid kits.', recipients: ['elderly'], tone: 'simple', pickupInfo: 'Koramangala', city: 'Bangalore', aiPrompt: '100 first-aid kits', status: 'Available' },
    { donorId: donor._id, category: 'clothes', quantity: '100 winter coats', description: 'Gently used warm coats.', recipients: ['homeless'], tone: 'warm', pickupInfo: 'Pune Station', city: 'Pune', aiPrompt: '100 winter coats for the needy', status: 'Available' },
    { donorId: donor._id, category: 'furniture', quantity: '5 desks', description: 'Used school desks.', recipients: ['children'], tone: 'simple', pickupInfo: 'Adyar', city: 'Chennai', aiPrompt: '5 school desks for rural learning', status: 'Available' },
    { donorId: donor._id, category: 'electronics', quantity: '10 tablets', description: 'Working tablets for e-learning.', recipients: ['children'], tone: 'urgent', pickupInfo: 'Salt Lake', city: 'Kolkata', aiPrompt: '10 tablets for digital education', status: 'Available' },
    { donorId: donor._id, category: 'food', quantity: '100 kg wheat', description: 'Sacks of wheat flour.', recipients: ['migrants'], tone: 'simple', pickupInfo: 'Navrangpura', city: 'Ahmedabad', aiPrompt: '100 kg wheat for community kitchens', status: 'Available' },
    { donorId: donor._id, category: 'clothes', quantity: '50 blankets', description: 'Thick warm blankets.', recipients: ['homeless'], tone: 'urgent', pickupInfo: 'Gachibowli', city: 'Hyderabad', aiPrompt: '50 thick blankets for winter', status: 'Available' },
    { donorId: donor._id, category: 'toys', quantity: '3 large boxes', description: 'Assorted soft toys and board games.', recipients: ['children'], tone: 'warm', pickupInfo: 'Vasant Vihar', city: 'Delhi', aiPrompt: 'Boxes of assorted toys for orphanages', status: 'Available' },
    { donorId: donor._id, category: 'books', quantity: '500 notebooks', description: 'Blank stationery and pens.', recipients: ['children'], tone: 'simple', pickupInfo: 'Andheri', city: 'Mumbai', aiPrompt: 'New blank notebooks and stationery', status: 'Available' }
  ];

  await ItemListing.insertMany(items);
  console.log("Seeded 3 ItemListings successfully.");
  process.exit(0);
}

seedItems();
