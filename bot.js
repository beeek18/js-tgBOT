const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('5945055423:AAHISEODoL3cWLU8D7VA4UKCQdPunGZro7Q');

bot.start((ctx) => ctx.reply('Hi 🤖'));



// Getting weather using geolocation
bot.on('message', async (ctx) => {
    if (ctx.message.location) {
        const apiKey = 'd3dd613a1d6d4b5e7f644cd0d78ee34b';

        const latitude = ctx.message.location.latitude;
        const longitude = ctx.message.location.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);

        ctx.reply(`${response.data.name}: ${response.data.main.temp}°С`)
    }
})



bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));