const SlackBot = require("slackbots");
const axios = require("axios");

const bot = new SlackBot({
  token: "xoxb-608845488691-613991970129-0tUz4CSH7nWFaHJIItEGBhUH",
  name: "MyPlazze Bakery"
});

bot.on("start", () => {
  bot.postMessageToChannel(
    "general",
    "Welcome to the MyPlazze Bakery Bot! Message help at anytime to get a directory of commands"
  );
});

bot.on("error", err => console.log(err));

bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  console.log(data);
  handleMessage(data.text);
});

function handleMessage(message) {
  if (message.includes("<@UJ1V5UJ3T>")) {
    if (message.includes(" specials")) {
      textSpecials();
    } else if (message.includes(" address") || message.includes(" location")) {
      textLocation();
    } else if (
      message.includes(" number") ||
      message.includes(" phone") ||
      message.includes(" tele") ||
      message.includes(" mobile")
    ) {
      textNumber();
    } else if (
      message.includes(" menu") ||
      message.includes(" prices") ||
      message.includes(" items") ||
      message.includes(" cost")
    ) {
      textMenu();
    } else if (message.includes(" help")) {
      textHelp();
     } else if (message.includes(" weather") || message.includes(" rain")) {
        textWeather();
    } else {
      bot.postMessageToChannel(
        "general",
        "I'm sorry, I didn't quite understand you, type HELP to see everything I can help you with!"
      );
    }
  }
}

function textSpecials() {
  axios
    .get(
      "https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery"
    )
    .then(res => {
      const special = res.data;

      const params = {
        icon_emoji: ":cake:"
      };

      bot.postMessageToChannel(
        "general",
        `You're going to LOVE today's special!!! It's none other than: ${special}`,
        params
      );
    });
}
function textLocation() {
  bot.postMessageToChannel(
    "general",
    "Let me check Google Maps for you...Found it!  We are located at Calle de Carretas, 14, 2ºA, 28010 Madrid"
  );
}

function textNumber() {
  bot.postMessageToChannel(
    "general",
    "Glad you asked! You can call us for FREE at 910 26 38 56"
  );
}

function textMenu() {
  bot.postMessageToChannel(
    "general",
    "Check out our menu: Latte Coffee -- $2, Banana Toffee -- $3, Cheese Cake -- $5, Chocalate Muffin -- $3, Strawberry Cookie -- $2, Sugar Donut -- $1.50, Carrot Cake -- $3,50, Ice Coffee -- $1.75"
  );
}

function textHelp() {
  bot.postMessageToChannel(
    "general",
    "Just text me with these keywords and I'll do my best:  ADDRESS, PHONE, SPECIALS, MENU, PRICES, HOURS, WEATHER"
  );
}

function textWeather() {
  axios
    .get(
      "https://api.darksky.net/forecast/97721ff51bc89cb50568aad7ee49c3d0/42.3601,-3.0589")
    .then(res => {
      const weather = res.data.minutely;
      console.log(res.data.minutely)

      const params = {
        icon_emoji: ":weather:"
      };

      bot.postMessageToChannel(
        "general",
        `You're going to LOVE today's special!!! It's none other than: ${weather}`,
        params
      );
    });
}
