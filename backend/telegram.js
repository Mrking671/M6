const TelegramBot = require('telegram-bot-api');
const mongoose = require('mongoose');
require('dotenv').config();

const bot = new TelegramBot({
  token: process.env.TELEGRAM_BOT_TOKEN
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Fetch and Save Videos from Telegram Channel
async function fetchVideos() {
  try {
    const updates = await bot.getUpdates();
    for (const update of updates) {
      if (update.channel_post && update.channel_post.video) {
        const video = update.channel_post.video;
        await Video.create({
          fileId: video.file_id,
          title: video.file_name || 'Untitled',
          description: update.channel_post.caption || '',
          duration: video.duration,
          channelId: update.channel_post.chat.id,
          messageId: update.channel_post.message_id
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
}

fetchVideos();
