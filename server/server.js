const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

/*
 * Connect to local MongoDB database named "flight-monitor"
 * Using Mongoose for schema and model management
 */
mongoose.connect('mongodb://localhost:27017/flight-monitor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

/*
 * Flight data schema definition
 * Each entry contains:
 *  - altitude: number (0–3000)
 *  - his: number (0–360)
 *  - adi: number (0 or 100)
 */
const flightSchema = new mongoose.Schema({
  altitude: Number,
  his: Number,
  adi: Number,
});
const FlightData = mongoose.model('FlightData', flightSchema);

/*
 * POST /api/data
 * Receives flight data and saves it to MongoDB
 */
app.post('/api/data', async (req, res) => {
  const { altitude, his, adi } = req.body;
  try {
    const newData = new FlightData({ altitude, his, adi });
    await newData.save();
    res.json({ message: 'Data saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

/*
 * GET /api/data
 * Returns all stored flight data from MongoDB
 */
app.get('/api/data', async (req, res) => {
  try {
    const allData = await FlightData.find();
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
