const axios = require("axios");

const getBase = async () => {
        const res = await axios.get("");
        return res.data.mahmud;
};

module.exports = {
        config: {
                name: "catbox2",
                aliases: ["cb"],
                version: "1.7",
                author: "RJ Raihan",
                countDown: 10,
                role: 0,
                description: {
                        bn: "যেকোনো মিডিয়া ফাইলকে লিঙ্কে রূপান্তর করুন",
                        en: "Convert any media file into a link",
                        vi: "Chuyển đổi bất kỳ tệp phương tiện nào thành liên kết"
                },
                category: "tools",
                guide: {
                        bn: '   {pn}: যেকোনো ছবি/ভিডিওতে রিপ্লাই দিয়ে ব্যবহার করুন',
                        en: '   {pn}: Reply to any image/video to get the link',
                        vi: '   {pn}: Phản hồi bất kỳ ảnh/video nào để lấy liên kết'
                }
        },

        langs: {
                bn: {
                        noMedia: "× বেবি, একটি ছবি বা ভিডিওতে রিপ্লাই দাও!",
                        error: "× সমস্যা হয়েছে: %1। প্রয়োজনে Contact MahMUD।\n•WhatsApp: 01836298139"
                },
                en: {
                        noMedia: "× Baby, please reply to a media file!",
                        error: "× API error: %1. Contact MahMUD for help.\n•WhatsApp: 01836298139"
                },
                vi: {
                        noMedia: "× Cưng ơi, hãy phản hồi một tệp phương tiện!",
                        error: "× Lỗi: %1. Liên hệ MahMUD để hỗ trợ.\n•WhatsApp: 01836298139"
                }
        },
err.response?.data?.error || err.message;
                        return message.reply(getLang("error", errorMsg));
                }
        }
};
