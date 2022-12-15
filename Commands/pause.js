const { MessageEmbed } = require("discord.js");
const { interaction } = require("..");
require('dotenv').config();
const name = 'pause'
module.exports = {
    name: 'pause',
    type: 'CHAT_INPUT',
    category: 'Music',
    description: 'Dừng nhạc đang chạy! 📛',
    run: async (client, interaction, args, distube, song) => {
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        function error(error) {
            const lomao = new MessageEmbed()
                .setColor('RED')
                .setDescription(`\`🚫\` | ${error}`)
            interaction.reply({ embeds: [lomao], ephemeral: true })
        }

        function success(success) {
            const thanhcong = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`\`✅\` | ${success}`)
            interaction.reply({ embeds: [thanhcong], ephemeral: true })
        }
        const status = queue =>
            `Âm lượng: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ')
            || 'Tắt'}\` | Lặp lại: \`${queue.repeatMode
                ? queue.repeatMode === 2
                    ? 'Toàn bộ'
                    : 'Một bài'
                : 'Tắt'
            }\` | Tự động phát: \`${queue.autoplay ? 'Bật' : 'Tắt'}\``
        const queue = client.distube.getQueue(interaction)
        const ID = queue.songs[0].user.id
        if (interaction.user.id != ID) return loi('Bạn không phải người bật nhạc!')
        if (!queue) return error(`Không có nhạc trong hàng chờ để sử dụng ${name}!`)
        if (!interaction.member.voice.channel) return error(`Bạn cần trong kênh voice để sử dụng lệnh này!`)
        if (queue.paused) return error(`Bài hát đang được dừng lại không cần dừng nữa!`)
        try {
            client.distube.pause(interaction)
            success(`Đã tạm dừng bài: \`${queue.songs[0].name}\``)
        } catch (e) {
            if (e.errorCode == 'PAUSE') {
                return textChannel(`Bài hát đang được dừng lại không cần dừng nữa!`)
            }
            console.error(e)
            console.log(e)
            error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
        }
    }
}