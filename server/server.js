// Importing the libraries
const express = require('express'); // Creates a server that accepts requests like GET, POST
const mongoose = require('mongoose'); // Allows connecting and working with the mongoDB
const cors = require('cors'); // Connects between the client side and the server side

const app = express(); // The server object
const PORT = 3001; // A communication location on a server where there is listening.

app.use(cors()); // Allows the server to receive requests from the client
// Allows the server to read data in JSON format
// JSON format is a simple way to transfer datas
app.use(express.json());

/*
 * Connect to local MongoDB database named "flight-monitor"
 * Using Mongoose for schema and model management
 */
mongoose.connect('mongodb://localhost:27017/flight-monitor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// There will be a message depending on what happened.
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
// Object
const FlightData = mongoose.model('FlightData', flightSchema);

/*
 * POST /api/data -> React sends data to the server
 * Receives flight data and saves it to MongoDB
 */
app.post('/api/data', async (req, res) => {
  const { altitude, his, adi } = req.body;
  try {
    // Creating a new object with the received data
    const newData = new FlightData({ altitude, his, adi });
    await newData.save(); // Save the data to MongoDB
    res.json({ message: 'Data saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});


/*
 * GET /api/data -> Gets all the flight data saved in MongoDB
 * Fetches the data and sends it back to the client
 */
app.get('/api/data', async (req, res) => {
  try {
    // Fetching all flight data from the database
    const allData = await FlightData.find();
    res.json(allData); // Returning the fetched data as JSON - JSON is a data transmission format.
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' }); 
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
