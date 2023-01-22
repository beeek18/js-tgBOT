const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('5945055423:AAHISEODoL3cWLU8D7VA4UKCQdPunGZro7Q');
bot.start((ctx) => ctx.reply('Hi 🤖'));
bot.on('message', async (ctx) => {
    if (ctx.message.location) {
        console.log(ctx.message);

        const lat = ctx.message.location.latitude;
        const lon = ctx.message.location.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d3dd613a1d6d4b5e7f644cd0d78ee34b`;

        const response = await axios.get(url);

        console.log(response);

        ctx.reply(`${response.data.name}: ${response.data.main.temp} C`)
    }
})



bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));