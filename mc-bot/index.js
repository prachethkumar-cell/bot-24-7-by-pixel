const mineflayer = require("mineflayer");
const express = require("express");

const app = express();

// Web server (keeps Render alive)
app.get("/", (req, res) => {
  res.send("Bot is alive");
});

app.listen(3000, () => {
  console.log("Web server running");
});

function createBot() {
  const bot = mineflayer.createBot({
    host: "itxpixel.aternos.me", // 🔴 change this
    port: 60223,
    username: "hacker"
  });

  bot.on("spawn", () => {
    console.log("Bot joined");

    setInterval(() => {
      const actions = ["forward", "back", "left", "right"];
      const action = actions[Math.floor(Math.random() * actions.length)];

      bot.setControlState(action, true);

      setTimeout(() => {
        bot.setControlState(action, false);
      }, 2000);

      if (Math.random() < 0.5) {
        bot.setControlState("jump", true);
        setTimeout(() => bot.setControlState("jump", false), 500);
      }
    }, 3000);
  });

  function reconnect() {
    console.log("Reconnecting...");
    setTimeout(createBot, 10000); // reconnect in 10 sec
  }

  bot.on("end", reconnect);
  bot.on("kicked", reconnect);
  bot.on("error", console.log);
}

createBot();