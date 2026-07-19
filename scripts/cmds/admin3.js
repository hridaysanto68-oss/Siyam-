// 👑 Owner Lock - Hriday Hassan Shanto

const ownerName = "hriday hassan shanto";

if (ownerName !== "hriday hassan shanto") {
  process.exit(0);
}

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const CACHE_DIR = path.join(__dirname, "cache");

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// 🎬 VIDEO LIST
const videoList = [
  {
    url: "https://i.imgur.com/F7jQaPw.mp4",
    file: "hriday1.mp4"
  },
  {
    url: "https://files.catbox.moe/psl98k.mp4",
    file: "hriday2.mp4"
  },
  {
    url: "https://files.catbox.moe/rzhmck.mp4",
    file: "hriday3.mp4"
  }
];

const indexFile = path.join(CACHE_DIR, "hridayIndex.json");

// 📥 AUTO DOWNLOAD
async function downloadVideos() {
  for (const video of videoList) {
    const filePath = path.join(CACHE_DIR, video.file);

    if (!fs.existsSync(filePath)) {
      try {
        const res = await axios({
          url: video.url,
          method: "GET",
          responseType: "stream"
        });

        const writer = fs.createWriteStream(filePath);
        res.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });

        console.log("Downloaded:", video.file);

      } catch (e) {
        console.log("Download Error:", e.message);
      }
    }
  }
}

downloadVideos();


module.exports = {

config: {
  name: "hriday_mention",
  version: "14.0",
  author: "Hriday Hassan Shanto",
  countDown: 0,
  role: 0,

  shortDescription: {
    en: "Hriday Admin Mention Reply"
  },

  category: "system"
},


onStart: async function(){},


onChat: async function({api,event,message}) {

try {

const admins = [
 {
  uid: "YOUR_UID",
  triggers:[
   "hriday hassan shanto",
   "hriday",
   "হৃদয়",
   "হৃদয় ভাই",
   "বস হৃদয়",
   "boss hriday",
   "hriday boss",
   "বট অ্যাডমিন কে"
  ]
 }
];


const senderID = String(event.senderID);

if(admins.some(a=>a.uid==senderID)) return;


const text = (event.body || "").toLowerCase();

if(!text) return;


const mentionIDs = event.mentions 
? Object.keys(event.mentions)
: [];


const check = admins.find(admin =>
 mentionIDs.includes(admin.uid) ||
 admin.triggers.some(t=>text.includes(t))
);


if(!check) return;


// পরের অংশে Caption + Video Send System থাকবে


}catch(e){

console.log("Hriday Mention Error:",e.message);

}

}

};
