const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "profile",
    aliases: [ "p" ],
    description: "Show your RPG profile!",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setAuthor("Test")
            .setDescription("test")
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("test");

        message.channel.send({
            embeds: [ embed ]
        })
    }
}