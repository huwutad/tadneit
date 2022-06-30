const { MessageEmbed } = require("discord.js")
const name = 'loop'
function error(error) {
  const lomao = new MessageEmbed()
    .setColor('RED')
    .setDescription(`\`🚫\`| ${error}`)
  interaction.reply({ embeds: [lomao], ephemeral: true })
}

module.exports = {
  name: 'loop',
  description: 'Lặp lại chỉ',
  options: [
    {
      name: "loopmode",
      description: "Chế độ lặp lại",
      type: "STRING",
      required: true,
      choices: [
        {
          "name": "Song",
          "value": "one"
        },
        {
          "name": "Queue",
          "value": "two"
        },
        {
          "name": "Off",
          "value": "three"
        },
      ],
    },
  ],
  run: async (client, interaction) => {
    const queue = client.distube.getQueue(interaction)
    console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
    try {
      if (interaction.options.getString('loopmode') == 'three') {
        client.distube.setRepeatMode(queue, 0)
        const embed = new MessageEmbed()
          .setColor(`RANDOM`)
          .setDescription(`Đã tắt lặp nhạc!`)
        await interaction.reply({ embeds: [embed] })
      }
      if (interaction.options.getString('loopmode') == 'one') {
        client.distube.setRepeatMode(queue, 1)
        const embed = new MessageEmbed()
          .setColor(`RANDOM`)
          .setDescription(`Đã bật lặp một bài nhạc!`)
        await interaction.reply({ embeds: [embed] })
      }
      if (interaction.options.getString('loopmode') == 'two') {
        client.distube.setRepeatMode(queue, 2)
        const embed = new MessageEmbed()
          .setColor(`RANDOM`)
          .setDescription(`Đã bật lặp cả hàng chờ!`)
        await interaction.reply({ embeds: [embed] })
      }
    } catch (e) {
      console.log(e)
      await error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
    }
  }
}
