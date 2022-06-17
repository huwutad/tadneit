const { MessageEmbed } = require("discord.js")
require('dotenv').config();
const name = 'skip'

module.exports = {
    name: 'skip',
    category: 'Music',
    description: 'Bỏ qua bài nhạc hiện tại! ⏩',
    type: 'CHAT_INPUT',
  run: async (client, interaction, args, distube) => {
    console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
    try {
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
	`Âm lượng: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ')
		|| 'Tắt❌'}\` | Lặp lại: \`${
		queue.repeatMode
			? queue.repeatMode === 2
				? 'Toàn bộ'
				: 'Một bài'
			: 'Tắt❌'
	}\` | Tự động phát: \`${queue.autoplay ? 'Bật✅' : 'Tắt❌'}\``
  const queue = client.distube.getQueue(interaction)
  const ID = queue.songs[0].user.id
  if (interaction.user.id != ID) return loi('Bạn không phải người bật nhạc!')
  if (!interaction.member.voice.channel) return  error(`Bạn cần trong kênh voice để sử dụng lệnh này!`)
  if (queue.songs.length == 1)  {
    client.distube.stop(interaction)
    await success(`Đã bỏ qua \`${queue.songs[0].name}\``)
    return
    }
    //error('Không thể skip vì còn một bài nhạc!')
    if (!queue) return error(`Không có nhạc trong hàng chờ để sử dụng ${name}`)
    client.distube.skip(interaction)
    success(`Đã bỏ qua \`${queue.songs[0].name}\``)
    }catch (e) {
      console.error(e)
      console.log(e)
      error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
      }
  }
}