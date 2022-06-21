const { MessageEmbed } = require("discord.js")
const name = 'queue'

module.exports = {
    name: 'queue',
    category: 'Music',
    description: 'Xem nhạc trong hàng chờ!',
    run: async (client, interaction, args, distube) => {
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        try {
            function error(error) {
                const lomao = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`\`❌\` | ${error}`)
                interaction.reply({ embeds: [lomao] })
            }

            function success(success) {
                const thanhcong = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`\`✅\` | ${success}`)
                interaction.reply({ embeds: [thanhcong] })
            }
            const queue = client.distube.getQueue(interaction)
            if (!queue) {
                error(`Không có nhạc trong hàng chờ để sử dụng ${name}`)
            } else {
                const embed2 = new MessageEmbed()
                    .setColor('GREEN')
                    .addField(`Hàng chờ nhạc hiện tại:`, `${queue.songs
                        .map((song, id) => `**${id ? id : "Đang phát"}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``)
                        .slice(0, 10)
                        .join("\n")}`, true)
                interaction.reply({ embeds: [embed2] })
            }
        } catch (e) {
            console.error(e)
            console.log(e)
            error('Đã có lỗi ở đâu đó hãy báo với hUwUtao#2022 để được fix, cảm ơn <:worry_love:974259906913902602> ')
        }
    }
}