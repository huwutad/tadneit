const { MessageEmbed, Client, CommandInteraction } = require('discord.js')
const name = 'ping'
module.exports = {
    name: "ping",
    category: 'Client',
    description: 'Xem tôi có lag không! 🏓',
    type: 'CHAT_INPUT',
    run: (client, interaction) => {
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        const embed = new MessageEmbed()
        .setColor(`RANDOM`)
        .setDescription(`🏓Độ trễ của bot là \`${Date.now() - interaction.createdTimestamp}\`ms.\n 🏓Độ trễ của API là \`${Math.round(client.ws.ping)}\`ms`)
        interaction.reply({embeds: [embed]})
    }
}