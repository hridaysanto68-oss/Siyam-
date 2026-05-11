const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "Magi2",
    version: "3.3.1",
    author: "FARHAN-KHAN",
    role: 0,
    countDown: 5,
    category: "media"
  },

  onStart: async function () {},

  onChat: async function ({ api, event }) {
    try {

      const body = (event.body || "").trim();
      if (!body) return;

      // 🎯 TRIGGER MAP
      const videoMap = [
        { key: "কলে আসো", link: "https://files.catbox.moe/p8qlso.mp4" },
        { key: "চিপা থেকে বাহির হও", link: "https://files.catbox.moe/atdk5k.mp4" },
        { key: "রিয়েক্ট দে", link: "https://files.catbox.moe/hitsnc.mp4" },
        { key: "😿", link: "https://files.catbox.moe/k6acls.mp4" },
        { key: "চুত মারানি", link: "https://files.catbox.moe/zdirp4.mp4" }
      ];

      // ✔️ MATCH (safe check)
      const match = videoMap.find(v => body.includes(v.key));
      if (!match) return;

      const cachePath = path.join(__dirname, "cache", "video.mp4");

      await fs.ensureDir(path.join(__dirname, "cache"));

      const res = await axios({
        url: match.link,
        method: "GET",
        responseType: "stream"
      });

      const writer = fs.createWriteStream(cachePath);
      res.data.pipe(writer);

      writer.on("close", () => {
        api.sendMessage(
          {
            body: "🎥 Video Sent 💚",
            attachment: fs.createReadStream(cachePath)
          },
          event.threadID,
          () => fs.unlinkSync(cachePath)
        );
      });

      writer.on("error", () => {
        api.sendMessage("❌ ভিডিও লোড করতে সমস্যা হয়েছে!", event.threadID);
      });

    } catch (e) {
      console.log(e);
    }
  }
};
