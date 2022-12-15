const { readdirSync } = require("fs");

module.exports = async (client) => {
    try {
        readdirSync("./Events/").forEach(file => {
            const event = require(`../Events/${file}`);
            let eventName = file.split(".")[0];
            client.distube.on(eventName, event.bind(null, client));
          });
    } catch (e) {
        console.log(e);
    }
    await delay(4000);
    console.log(`Da load xong Distube`);
};