const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const FitnessRouter = require('./Routes/FitnessRouter');
const SlotRouter = require('./Routes/SlotRouter');
const gymEquipmentRoutes = require('./Routes/GymEquipmentRouter');
const UserProfileRouter = require('./Routes/UserProfileRouter');

const app = express();
const PORT = process.env.PORT || 8080;

// Load Mongo URI from .env
const mongo_url = process.env.MONGO_URI;
if (!mongo_url) {
  console.error("❌ MONGO_URI not found in .env file");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected...'))
.catch((err) => {
  console.error('❌ MongoDB Connection Error:', err.message);
  process.exit(1);
});

// Middleware
app.use(cors());
app.use(express.json());

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/api/predict-plan', FitnessRouter);
app.use('/api/slots', SlotRouter); // Slot booking API
app.use('/api/equipment', gymEquipmentRoutes);
app.use('/api/profile', UserProfileRouter);



// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
