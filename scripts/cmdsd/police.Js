const fs = require("fs-extra");

module.exports = {
  config: {
    name: "police",
    version: "1.0.0",
    author: "Hridoy Hasan Shanto",
    countDown: 5,
    role: 0,
    category: "fun",
    shortDescription: "Funny Police Meme",
    longDescription: "Mention or reply someone to make police meme",
    guide: "{pn} @mention"
  },

  onStart: async function ({ api, event, message }) {
    const { mentions, messageReply } = event;

    let uid;

    if (Object.keys(mentions).length > 0)
      uid = Object.keys(mentions)[0];
    else if (messageReply)
      uid = messageReply.senderID;

    if (!uid)
      return message.reply("🚔 | কাউকে মেনশন বা রিপ্লাই দাও!");

    const userInfo = await api.getUserInfo(uid);
    const name = userInfo[uid].name;

    const msg = [
      `🚔 পুলিশ ${name} কে খুঁজছে!`,
      `😂 ${name} আবার ধরা খাইছে!`,
      `🚨 সতর্কতা! ${name} সন্দেহভাজন!`,
      `🤡 ${name} এর বিরুদ্ধে হাসির মামলা হয়েছে!`,
      `👮 ${name} কে জিজ্ঞাসাবাদের জন্য নেওয়া হচ্ছে!`
    ];

    return message.reply(
      msg[Math.floor(Math.random() * msg.length)]
    );
  }
};
