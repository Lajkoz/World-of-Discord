//requires
const Discord = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
})
require("dotenv").config();
const prefix = process.env.prefix;

//collections
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//handlers system
["command"].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
  });

require(`./handlers/Events`)(client);
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

//message event, dont ask 
client.on("messageCreate", async (message) => {
    if(message.content === "ping") message.reply("pong!")

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args)
  });

//login
client.login(process.env.token);