const { MessageEmbed } = require("discord.js")
const maxVol = 150;
require('dotenv').config();
const name = 'volume'

module.exports = {
  name: 'volume',
  category: 'Music',
  description: 'Chỉnh âm thanh của bài nhạc! 🔊',
  options: [
    {
        name: 'volume',
        description: 'Âm lượng bạn muốn!',
        type: 'NUMBER',
        required: true,
    }
],
  run: async (client, interaction, args) => {
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
    function normal(normal) {
        const bth = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`${normal}`)
        interaction.reply({embeds: [bth], ephemeral: true})
    }
    let args = interaction.options.getNumber("volume");
    if (!interaction.member.voice.channel) return error(`Bạn cần trong kênh voice để sử dụng lệnh này!`)
      //if (isNaN(args)) return error(`Lượng âm thanh chỉ nhận là số chữ không phải chữ!`)
    const queue = client.distube.getQueue(interaction)
    const ID = queue.songs[0].user.id
    if (interaction.user.id != ID) return loi('Bạn không phải người bật nhạc!')
    if (!queue) return error(`Không có nhạc trong hàng chờ để sử dụng ${name}!`)
     //if (!args)  {
        //return normal(`Âm lượng hiện tại của bài nhạc là: \`${queue.volume}%\``)
     //}else {
      //if (Number(args) < 0 || Number(args) > maxVol) return error(`Volume max là từ **1** -> **${maxVol}** nhé!`)
      client.distube.setVolume(interaction, Number(args))
      success(`Âm lượng hiện tại của bài nhạc là: \`${queue.volume}%\``)
    //}
  }catch (e) {
    console.error(e)
    console.log(e)
    error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
    }
  }
}