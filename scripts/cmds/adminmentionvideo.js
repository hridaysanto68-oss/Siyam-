const fs = require("fs");
const path = require("path");
const axios = require("axios");

const adminUIDs = [
  "61592047966619",
  "61592409098767"
];

const captions = [
  "😎 অ্যাডমিনকে মেনশন করা হয়েছে!",
  "🔥 একটু অপেক্ষা করুন, অ্যাডমিন দেখছেন।",
  "🎬 আপনার মেনশন পৌঁছে গেছে।",
  "👀 অ্যাডমিনের দৃষ্টি আকর্ষণ করা হয়েছে!",
  "💬 অ্যাডমিনকে নোটিফিকেশন পাঠানো হয়েছে।"
];

module.exports = {
  config: {
    name: "adminmentionvideo",
    version: "2.0.0",
    author: "ChatGPT",
    role: 0,
    category: "system",
    shortDescription: "Reply with video when admin is mentioned"
  },

  onStart: async () => {},

  onChat: async function ({ event, message }) {
    try {
      if (!event.mentions || Object.keys(event.mentions).length === 0)
        return;

      const mentionIDs = Object.keys(event.mentions);

      const isAdminMention = mentionIDs.some(uid =>
        adminUIDs.includes(uid)
      );

      if (!isAdminMention) return;

      const cacheDir = path.join(__dirname, "cache");

      if (!fs.existsSync(cacheDir))
        fs.mkdirSync(cacheDir, { recursive: true });

      const videoPath = path.join(cacheDir, "adminmention.mp4");

      if (!fs.existsSync(videoPath)) {
        const res = await axios({
          url: "https://files.catbox.moe/qgmyk9.mp4",
          method: "GET",
          responseType: "stream"
        });

        const writer = fs.createWriteStream(videoPath);
        res.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });
      }

      const randomCaption =
        captions[Math.floor(Math.random() * captions.length)];

      return message.reply({
        body: randomCaption,
        attachment: fs.createReadStream(videoPath)
      });

    } catch (err) {
      console.log("AdminMentionVideo Error:", err);
    }
  }
};
