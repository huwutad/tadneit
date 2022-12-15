const db = require(`./dbLogin.js`);
const client = require('../index')
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.slashCommands.get(interaction.commandName);
    if (!command) interaction.reply(`Lệnh không hợp lệ!`)
    command.run(client, interaction, db);   
})