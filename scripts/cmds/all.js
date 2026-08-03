const AUTHOR = "SIYAM"; // 🔒 DO NOT CHANGE

module.exports = {
	config: {
		name: "all",
		version: "2.2",
		author: AUTHOR,
		countDown: 5,
		role: 1,
		description: {
			en: "Mention all members"
		},
		category: "box chat"
	},

	onStart: async function ({ message, event, api }) {

		if (module.exports.config.author !== AUTHOR) {
			console.log("⛔ AUTHOR MODIFIED! FILE LOCKED.");
			process.exit(1);
		}

		try {

			const { participantIDs, threadID } = event;
			const mentions = [];

			const botName =
				global.GoatBot?.config?.botName ||
				global.config?.BOTNAME ||
				"👑 NIJHUM BOT";

			const prefix =
				global.GoatBot?.config?.prefix ||
				global.config?.PREFIX ||
				"/";

			const now = new Date();

			const time = now.toLocaleTimeString("en-US", {
				timeZone: "Asia/Dhaka",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: true
			});

			const date = now.toLocaleDateString("en-GB", {
				timeZone: "Asia/Dhaka"
			});

			let body = `╔════👑 lamiya bot 👑════╗

📢 সবাই একটু অ্যাক্টিভ হও!

🔥 সবাইকে মেনশন করা হয়েছে।
💬 দ্রুত রিপ্লাই দাও।

━━━━━━━━━━━━━━━━━━
🤖 BOT    : ${botName}
⚙️ PREFIX : ${prefix}

🕒 TIME   : ${time}
📅 DATE   : ${date}

👑 OWNER : hriday hassan shanto 
🆔 UID : 61578037541206

━━━━━━━━━━━━━━━━━━

`;

			for (const uid of participantIDs) {
				try {
					const info = await api.getUserInfo(uid);
					const name = info[uid]?.name || "Member";

					const tag = `@${name}`;
					mentions.push({
						tag,
						id: uid,
						fromIndex: body.length
					});

					body += `${tag} `;
				}
				catch {
					const tag = "@Member";
					mentions.push({
						tag,
						id: uid,
						fromIndex: body.length
					});
					body += `${tag} `;
				}
			}

			body += "\n\n👑 Thanks for staying active.";

			return message.reply({
				body,
				mentions
			});

		}
		catch (err) {
			console.error(err);
			return message.reply("❌ Error:\n" + err.message);
		}
	}
};
