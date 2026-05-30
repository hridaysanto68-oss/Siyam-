const { getTime } = global.utils;
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const videoLinks = [
  "https://files.catbox.moe/bhzikp.mp4",
  "https://files.catbox.moe/tk688p.mp4"
];

const countFile = path.join(__dirname, "autoinvite_count.json");
const cacheDir = path.join(__dirname, "cache");

// cache folder না থাকলে তৈরি করবে
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

module.exports = {
  config: {
    name: "autoinvite",
    version: "2.5",
    author: "Farhan-Khan",
    category: "events"
  },

  onStart: async ({ api, event, usersData, message }) => {
    if (event.logMessageType !== "log:unsubscribe") return;

    const { threadID, logMessageData, author } = event;
    const leftID = logMessageData.leftParticipantFbId;

    // যদি কেউ নিজের ইচ্ছায় লিভ নেয় (kick না)
    if (leftID === author) {
      const userName = await usersData.getName(leftID);

      // Messenger-friendly bold font map
      const boldMap = {
        A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝",
        K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧",
        U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",
        a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷",
        k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁",
        u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇"
      };

      const boldName = userName.split("").map(c => boldMap[c] || c).join("");

      const form = {
        body: `-পলাইছে রে পলাইছে...!! 
『 ${boldName} 』
-এই বলদ পলাইছে.!😹 
-আমি বস『 👑 𝐒𝐈𝐘𝐀𝐌-👑 』এর বট থাকতে.!
-তুই পালাতে পারবি না-😂😹👈`
      };

      try {
        await api.addUserToGroup(leftID, threadID);

        let currentIndex = 0;

        if (fs.existsSync(countFile)) {
          try {
            currentIndex = JSON.parse(
              fs.readFileSync(countFile, "utf8")
            ).index || 0;
          } catch {}
        }

        const selectedVideo = videoLinks[currentIndex % videoLinks.length];

        fs.writeFileSync(
          countFile,
          JSON.stringify({
            index: (currentIndex + 1) % videoLinks.length
          })
        );

        const videoPath = path.join(
          cacheDir,
          `autoinvite_${Date.now()}.mp4`
        );

        const response = await axios({
          url: selectedVideo,
          method: "GET",
          responseType: "stream"
        });

        const writer = fs.createWriteStream(videoPath);

        await new Promise((resolve, reject) => {
          response.data.pipe(writer);
          writer.on("finish", resolve);
          writer.on("error", reject);
        });

        await message.send({
          body: form.body,
          attachment: fs.createReadStream(videoPath)
        });

        setTimeout(() => {
          try {
            if (fs.existsSync(videoPath)) {
              fs.unlinkSync(videoPath);
            }
          } catch {}
        }, 5000);

      } catch (err) {
        message.send(
          "⚠️উফফ... ইউজারটাকে আবার অ্যাড দিতে পারলাম না 😿 🔒 হয়তো প্রাইভেসি বা অন্য কোনো সমস্যা আছে! 🤲 আল্লাহ যা করেন ভালোর জন্যই করেন 💖"
        );
      }
    }
  }
};
