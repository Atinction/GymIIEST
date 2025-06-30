const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const FitnessRouter = require('./Routes/FitnessRouter');
const SlotRouter = require('./Routes/SlotRouter');

const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB Connection
const mongo_url = process.env.MONGO_URI;
if (!mongo_url) {
    console.error("❌ MONGO_URI not found in .env file");
    process.exit(1);
}

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

// Routes
app.get('/ping', (req, res) => {
    res.send('PONG');
});
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/api/predict-plan', FitnessRouter);
app.use('/api/slots', SlotRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
