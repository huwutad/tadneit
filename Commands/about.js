const { MessageEmbed, ButtonInteraction } = require('discord.js');
const packageJSON = require('../package.json');
const { readdirSync } = require('fs');
const name = 'about'

module.exports = {
    name: 'about',
    category: 'Client',
    description: 'Xem các thông tin của bot! 🤖',
    run: (client, interaction) => {
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        const createtime = client.user.createdAt
        const createday = new Date(createtime)
        const createago = Math.floor(createday.getTime() / 1000.0)
        console.log(createago)
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        const discordJSVersion = packageJSON.dependencies["discord.js"];
        let uptime = `${days} ngày, ${hours} giờ, ${minutes} phút và ${seconds} giây`;
        readdirSync('./Commands/').forEach(dir => {
        const length = readdirSync('./Commands').length
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.tag}`, client.user.displayAvatarURL())
            .setTitle(`Tất tần tận về ${client.user.tag}`)
            .addField(`Tên bot: `, `${client.user.tag} ( ${client.user.id} )`)
            .addField("Tổng lệnh:", `${length}`)
            .addField(`Uptime:`, `${uptime}`)
            .addField('Số server:', `${client.guilds.cache.size}`)
            .addField('Sinh nhật mình:', `(<t:${createago}:F>)`)
            .addField('Node.js version', `${process.version}`, true)
            .addField("Discord.js version", `${discordJSVersion}`, true)
            .setTimestamp()
        //.setFooter(`Được yêu cầu bởi ${interaction.author.username} • ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
        interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
        })
    }
}