const { Events } = require("../Validation/eventsNames");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const ascii = require("ascii-table");

module.exports = async (client) => {
    const table = new ascii("Eventy");

    (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !event.name) {
            const l = file.split("/");
            await table.addRow(`${event.name} || "NIE ZNALEZIONO"`, `Nie ma eventow: ${l[6] + `/` + l[7]}`);
            return;
        }

        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client))
        } else {
            client.on(event.name, (...args) => event.execute(...args, client))
        };

        await table.addRow(event.name, "OG")
    });

    console.log(table.toString());
}