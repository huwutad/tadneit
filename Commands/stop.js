const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const name = 'stop'

module.exports = {
  name: 'stop',
  category: 'Music',
  type: 'CHAT_INPUT',
  description: 'Dừng lại bài nhạc đang phát! ⛔',
  run: async (client, interaction, args, distube) => {
    console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
    function error(error) {
        const lomao = new MessageEmbed()
        .setColor('RED')
        .setDescription(`\`🚫\` | ${error}`)
        interaction.reply({embeds: [lomao], ephemeral: true})
    }

    function success(success) {
        const thanhcong = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`\`✅\` | ${success}`)
        interaction.reply({embeds: [thanhcong], ephemeral: true})
    }
    const status = queue =>
    `Âm lượng: \`${queue.volume}%\` | Filter: \`${
        queue.filters.join(', ') || 'Tắt❌'
    }\` | Lặp lại: \`${
        queue.repeatMode
            ? queue.repeatMode === 2
                ? 'Tất cả bài nhạc!'
                : 'Một bài nhạc!'
            : 'Tắt❌'
    }\` | Tự động phát: \`${queue.autoplay ? 'Bật✅' : 'Tắt❌'}\``
  const queue = client.distube.getQueue(interaction)
  const ID = queue.songs[0].user.id
  if (interaction.user.id != ID) return loi('Bạn không phải người bật nhạc!')
  if (!queue) return error(`Không có nhạc trong hàng chờ để sử dụng ${name}`)
  if (!interaction.member.voice.channel) return error(`Bạn cần trong kênh voice để sử dụng lệnh này!`)
  try {
      client.distube.stop(interaction)
      success(`Đã dừng lại bài \`${queue.songs[0].name}\`   `)
    } catch (e) {
      console.error(e)
      console.log(e)
      error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
      }
  }
}