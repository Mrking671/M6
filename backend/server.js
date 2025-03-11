const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Video Schema
const videoSchema = new mongoose.Schema({
  fileId: String,
  title: String,
  description: String,
  thumbnail: String,
  duration: Number,
  channelId: String,
  messageId: String
});

const Video = mongoose.model('Video', videoSchema);

// API to Fetch Videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to Get Video Stream URL
app.get('/api/video/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    const fileLink = `https://t.me/c/${video.channelId.toString().replace('-100', '')}/${video.messageId}`;
    res.json({ url: fileLink });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
