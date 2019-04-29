require("dotenv").config();

const SlackBot = require("slackbots");
const axios = require("axios");
const SLACK_TOKEN = process.env.SLACK_TOKEN;
console.log(SLACK_TOKEN);
const bot = new SlackBot({
  token: SLACK_TOKEN,
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
    if (message.includes(" specials") || message.includes("special")) {
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
    } else if (
      message.includes(" hello") ||
      message.includes(" hi") ||
      message.includes(" hey")
    ) {
      textHi();
    } else if (message.includes(" hours") || message.includes(" open")) {
      textHours();
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

function textHi() {
  bot.postMessageToChannel(
    "general",
    "Hi there! I am the MyPlazze Bakery bot.  Ask me questions about our business and I'll reply back to you as best as I can! "
  );
}

function textHours() {
  bot.postMessageToChannel(
    "general",
    "Our business hours are:  Moday - Friday from 8am - 6pm, On Saturdays we are open from 9am - 3pm"
  );
}

function textWeather() {
  axios
    .get(
      "https://api.darksky.net/forecast/97721ff51bc89cb50568aad7ee49c3d0/40.4167,-3.7037"
    )
    .then(res => {
      const curWeather = res.data.currently.summary;
      const curTemp = res.data.currently.temperature;
      const curTempCelsius = (curTemp - 32) / 1.8;
      const params = {
  
      };

      bot.postMessageToChannel(
        "general",
        `The current weather in Madrid is ${curWeather} and the temperature is ${curTempCelsius.toFixed(1)}º Celsius`,
        params
      );
    });
}
