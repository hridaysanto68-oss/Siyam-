module.exports = {
  config: {
    name: "hriday_mention",
    version: "1.0.0",
    author: "Hriday Hasan Shanto",
    countDown: 0,
    role: 0,
    shortDescription: "Reply when owner is mentioned",
    category: "system"
  },

  onStart: async () => {},

  onChat: async ({ event, message }) => {
    const owner = {
      uid: "YOUR_UID_HERE", // এখানে নিজের UID দিন
      names: [
        "@হৃদয়",
        "@হৃদয় হাসান শান্ত",
        "হৃদয়",
        "hriday"
      ]
    };

    // Owner নিজে লিখলে রিপ্লাই দিবে না
    if (String(event.senderID) === owner.uid) return;

    const body = (event.body || "").toLowerCase();
    const mentions = event.mentions ? Object.keys(event.mentions) : [];

    const detected =
      mentions.includes(owner.uid) ||
      body.includes(owner.uid) ||
      owner.names.some(n => body.includes(n.toLowerCase()));

    if (!detected) return;

    const replies = [
      "🌸 হৃদয় হাসান শান্ত বস এখন ব্যস্ত আছেন, একটু অপেক্ষা করুন।",
      "💙 বস ফ্রি হলে অবশ্যই আপনার মেসেজের উত্তর দেবেন।",
      "✨ বারবার মেনশন না করে ইনবক্সে মেসেজ দিয়ে রাখুন।",
      "😊 হৃদয় হাসান শান্ত বস অনলাইনে এলে রিপ্লাই করবেন।",
      "❤️ ধন্যবাদ, একটু ধৈর্য ধরুন।"
    ];

    const text = replies[Math.floor(Math.random() * replies.length)];

    await message.reply(
`━━━━━━━━━━━━━━━━━━
${text}
━━━━━━━━━━━━━━━━━━
👑 BOT OWNER
Hriday Hasan Shanto
━━━━━━━━━━━━━━━━━━`
    );
  }
};
