const fs = require("fs")
const { Client } = require("discord.js");
/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const eventFiles = fs.readdirSync('./Events').filter(file => file.endsWith('.js'));

    for(const file of eventFiles) {
        const event = require(`../Events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}