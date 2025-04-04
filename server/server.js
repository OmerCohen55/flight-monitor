const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// התחברות למסד הנתונים
mongoose.connect('mongodb://localhost:27017/flight-monitor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// מודל של נתוני הטיסה
const flightSchema = new mongoose.Schema({
  altitude: Number,
  his: Number,
  adi: Number,
});
const FlightData = mongoose.model('FlightData', flightSchema);

// POST: קבלת נתונים ושמירה
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

// GET: החזרת כל הנתונים
app.get('/api/data', async (req, res) => {
  try {
    const allData = await FlightData.find();
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
