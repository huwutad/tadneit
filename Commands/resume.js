const { MessageEmbed } = require("discord.js")
require('dotenv').config();
const name = 'resume'

module.exports = {
  name: 'resume',
  type: 'CHAT_INPUT',
  category: 'Music',
  description: 'Tiếp tục nhạc hiện tại! ▶',
  run: async (client, interaction, args, distube) => {
    console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
      function error(error) {
        const lomao = new MessageEmbed()
        .setColor('RED')
        .setDescription(`\`❌\` | ${error}`)
        interaction.reply({embeds: [lomao], ephemeral: true})
    }

    function success(success) {
        const thanhcong = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`\`✅\` | ${success}`)
        interaction.reply({embeds: [thanhcong], ephemeral: true})
    }
    function textChannel(textChannel) {
        const channel = new MessageEmbed()
        .setColor('RED')
        .setDescription(`\`🚫\` | ${textChannel}`)
        interaction.reply({embeds: [channel], ephemeral: true})
    }
    const status = queue =>
	`Âm lượng: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ')
		|| 'Tắt'}\` | Lặp lại: \`${
		queue.repeatMode
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
  try {
      client.distube.resume(interaction)
      client.distube.pause(interaction)
      client.distube.resume(interaction)
      success(`Đã tiếp tục bài: \`${queue.songs[0].name}\``)
  } catch (e) {
    if (e.errorCode == 'RESUMED') {
      return textChannel(`Bài hát đang được phát không cần tiếp tục!`)
      }
      console.error(e)
      console.log(e)
      error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
      }
  }
}