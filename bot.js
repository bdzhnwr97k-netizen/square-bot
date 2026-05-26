const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "8877338693:AAE6ddKUfj9Lz3eCRHXnnVu-SoqijMhRvQk";
const ADMIN_ID = 8491750678;
const SITE = "https://salla.sa/squarehub";
const BOT_LINK = "https://t.me/squarestore7";

const bot = new TelegramBot(TOKEN, { polling: true });

const humanMode = {};
const suggestMode = {};
let activeCustomer = null;

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
`أحلى من شرّف سكوير ستور 🤍🎮

وش تحتاج يا الغالي؟`
  );
});

bot.on("message", (msg) => {
  const id = msg.chat.id;
  const text = msg.text || "";
  const username = msg.from.username ? "@" + msg.from.username : "بدون يوزر";

  if (text.startsWith("/")) return;

  // أوامر الأدمن
  if (id === ADMIN_ID) {
    if (text.startsWith("قله ")) {
      if (!activeCustomer) {
        return bot.sendMessage(ADMIN_ID, "ما فيه عميل مفتوح حالياً.");
      }

      const reply = text.replace("قله ", "");
      bot.sendMessage(activeCustomer, reply);
      return bot.sendMessage(ADMIN_ID, "✅ تم إرسال الرسالة");
    }

    if (text === "تمام") {
      if (!activeCustomer) {
        return bot.sendMessage(ADMIN_ID, "ما فيه عميل مفتوح حالياً.");
      }

      humanMode[activeCustomer] = false;
      activeCustomer = null;
      return bot.sendMessage(ADMIN_ID, "✅ تم إرجاع العميل للبوت");
    }
  }

  // استقبال اقتراح لعبة/منصة
  if (suggestMode[id]) {
    suggestMode[id] = false;

    bot.sendMessage(
      ADMIN_ID,
`💡 اقتراح جديد من عميل

🆔 رقم العميل:
${id}

👤 اليوزر:
${username}

🎮 اقتراحه:
${text}`
    );

    return bot.sendMessage(
      id,
`الله يعطيك العافية يا الغالي 🤍

وصلنا اقتراحك، وبإذن الله نشوف أكثر الألعاب والمنصات المطلوبة ونضيفها قريبًا 🔥`
    );
  }

  // إذا العميل محول لخدمة العملاء
  if (humanMode[id]) {
    activeCustomer = id;

    bot.sendMessage(
      ADMIN_ID,
`📩 رسالة جديدة من العميل

🆔 رقم العميل:
${id}

👤 اليوزر:
${username}

💬 الرسالة:
${text}

للرد اكتب:
قله رسالتك

مثال:
قله هلا يا الغالي

لإرجاع العميل للبوت اكتب:
تمام`
    );

    return;
  }

  // الأسعار
  if (text.includes("سعر") || text.includes("الأسعار") || text.includes("كم")) {
    return bot.sendMessage(
      id,
`يا الغالي الأسعار تلقاها بالموقع مباشرة 🔥

ادخل الموقع واكتب اسم اللعبة وبيطلع لك سعرها:

${SITE}`
    );
  }

  // الخصم
  if (text.includes("خصم") || text.includes("كود")) {
    return bot.sendMessage(
      id,
`أيوه يا الغالي 🔥

كود الخصم:
SQU23

خصم 10% لأول 3 طلبات 🤍`
    );
  }

  // اقتراحات ألعاب ومنصات
  if (
    text.includes("ما عندكم") ||
    text.includes("مو موجود") ||
    text.includes("ما لقيت") ||
    text.includes("تقترح") ||
    text.includes("اقتراح") ||
    text.includes("ضيفوا") ||
    text.includes("أضف") ||
    text.includes("اضيفوا")
  ) {
    suggestMode[id] = true;

    return bot.sendMessage(
      id,
`إذا جيت تدور على لعبة لمنصتك وما لقيتها، أو عندك ألعاب/منصات تقترح نضيفها:

ارسل لنا اسم اللعبة أو المنصة هنا يا الغالي، وشكرًا لك 🤍`
    );
  }

  // خدمة العملاء
  if (
    text.includes("خدمة") ||
    text.includes("موظف") ||
    text.includes("دعم") ||
    text.includes("الفريق")
  ) {
    humanMode[id] = true;
    activeCustomer = id;

    bot.sendMessage(
      ADMIN_ID,
`🚨 عميل يحتاج خدمة عملاء

🆔 رقم العميل:
${id}

👤 اليوزر:
${username}

💬 قال:
${text}

للرد اكتب:
قله رسالتك`
    );

    return bot.sendMessage(
      id,
`أبشر يا الغالي 🤍

بحولك لخدمة العملاء ويكملون معك مباشرة 🔥`
    );
  }

  // أي شيء البوت ما يفهمه
  humanMode[id] = true;
  activeCustomer = id;

  bot.sendMessage(
    ADMIN_ID,
`🚨 البوت ما عرف يرد

🆔 رقم العميل:
${id}

👤 اليوزر:
${username}

💬 قال:
${text}

للرد اكتب:
قله رسالتك`
  );

  bot.sendMessage(
    id,
`يا الغالي ما فهمت طلبك بالكامل 🤍

لكن لا تشيل هم، بحولك لخدمة العملاء ويشوفون موضوعك بأسرع وقت 🔥`
  );
});const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});