const fs = require("fs-extra");

const warnFile = __dirname + "/cache/policeWarn.json";

if (!fs.existsSync(warnFile))
  fs.writeJsonSync(warnFile, {});

const badWords = [
  "badword1",
  "badword2",
  "গালি১",
  "গালি২"
];

module.exports = {
  config: {
    name: "autoPolice",
    version: "1.0.0",
    author: "Hridoy Hasan Shanto",
    category: "events",
    eventType: ["message"]
  },

  onStart: async function () {},

  onChat: async function ({ api, event, usersData }) {

    const { threadID, senderID, body } = event;

    if (!body) return;

    let msg = body.toLowerCase();

    let found = badWords.some(word =>
      msg.includes(word.toLowerCase())
    );

    if (!found) return;


    let warns = fs.readJsonSync(warnFile);

    if (!warns[threadID])
      warns[threadID] = {};

    if (!warns[threadID][senderID])
      warns[threadID][senderID] = 0;


    warns[threadID][senderID]++;

    fs.writeJsonSync(warnFile, warns, {
      spaces: 2
    });


    let name = await usersData.getName(senderID);


    if (warns[threadID][senderID] >= 3) {

      api.sendMessage(
`🚨 GOD POLICE SYSTEM 🚨

👤 User: ${name}

❌ 3 Warning Completed
⚠️ Reason: Bad Word Usage

🔨 Action: Removing User`,
        threadID
      );

      // Kick (optional)
      // api.removeUserFromGroup(senderID, threadID);

      warns[threadID][senderID] = 0;
      fs.writeJsonSync(warnFile, warns);

    } else {

      api.sendMessage(
`👮 GOD BOT POLICE

⚠️ Bad Word Detected!

👤 User: ${name}
🚫 Warning: ${warns[threadID][senderID]}/3

Please follow group rules.`,
        threadID
      );

    }
  }
};
