const { MessageEmbed} = require('discord.js')
require('dotenv').config();
const name = 'autoplay'

module.exports = {
    name: "autoplay",
    description: 'Tự động phát nhạc tiếp theo mà không cần chọn nhạc! 💨',
    type: 'CHAT_INPUT',
    run: async (client, interaction, args, distube) => {
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        function error(error) {
            const lomao = new MessageEmbed()
            .setColor('RED')
            .setDescription(`\`🚫\`| ${error}`)
            interaction.reply({embeds: [lomao], ephemeral: true})
        }
    function success(success) {
            const thanhcong = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`\`✅\` | ${success}`)
            interaction.reply({embeds: [thanhcong], ephemeral: true})
        }
        const queue = client.distube.getQueue(interaction)
        const ID = queue.songs[0].user.id
        if (interaction.user.id != ID) return error('Bạn không phải người bật nhạc!')
        if (!queue) return error(`Không có nhạc trong hàng chờ để sử dụng ${name}`)
        try {
            const mode = client.distube.toggleAutoplay(interaction)
            success("Đã `" + (mode ? "Bật" : "Tắt") + "` tự động phát bài mới.")
        } catch (e) {
            console.error(e)
            console.log(e)
            error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
        }
    },
};