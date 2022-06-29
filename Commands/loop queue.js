const { MessageEmbed } = require("discord.js")
const name = 'loop queue'

module.exports = {
    name: 'loopQueue',
    description: 'Tắt lặp lại cho bài đang hát!',
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
            client.distube.setRepeatMode(queue, 2)
            const embed = new MessageEmbed()
                .setColor(`RANDOM`)
                .setDescription(`Đã lặp lại cả queue!`)
            await interaction.reply({ embes: [embed] })
        } catch (err) {
            console.log(e)
            await error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
        }
    }
}
