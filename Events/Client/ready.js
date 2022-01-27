const chalk = require("chalk");

module.exports = {
    name: "ready",
    once: true,
    execute (client) {
        console.log(chalk.green(`Zalogowano jako ${client.user.username}!`));
        client.user.setActivity("Ruchanie matki...", { type: "PLAYING" });
    }  
}