const { MessageEmbed } = require("discord.js")
const name = 'loop song'

module.exports = {
    name: 'loopsong',
    description: 'Bật lặp lại cho một bài đang phát hiện tại',
    run: async (client, interaction) => {
        function error(error) {
            const lomao = new MessageEmbed()
                .setColor('RED')
                .setDescription(`\`🚫\`| ${error}`)
            interaction.reply({ embeds: [lomao], ephemeral: true })
        }
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        try {
            const queue = client.distube.getQueue(interaction.member.voice.channel)
            client.distube.setRepeatMode(queue, 1)
            const embed = new MessageEmbed()
                .setColor(`RANDOM`)
                .setDescription(`Đã bật lặp lại một bài!`)
            await interaction.reply({ embes: [embed] })
        } catch (e) {
            console.log(e)
            await error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
        }
    }
}