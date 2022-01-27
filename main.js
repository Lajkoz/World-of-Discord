const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
})
require("dotenv").config();
const chalk = require("chalk");

client.on("ready", () => {
    console.log(chalk.green(`Zalogowano jako ${client.user.username}!`));
    client.user.setActivity("Ruchanie matki...", { type: "PLAYING" });
});

client.on("messageCreate", async message => {
    if(message.content === "ping") message.reply("pong!");
});

client.login(process.env.token);