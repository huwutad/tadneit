const { MessageEmbed, Client, CommandInteraction } = require('discord.js')
require('dotenv').config();
const name = 'play'
module.exports = {
    name: "play",
    category: "Music",
    description: 'Tìm kiếm nhạc bạn muốn nghe! 🎶',
    options: [
        {
            name: 'musics',
            description: 'Bài nhạc bạn muốn tui bật cho bạn!',
            type: 'STRING',
            required: true,
        }
    ],
    run: async (client, interaction, args) => {
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        async function error(error) {
            const lomao = new MessageEmbed()
            .setColor('RED')
            .setDescription(`\`🚫\` | ${error}`)
            interaction.followUp({embeds: [lomao], ephemeral: true})
        }
        await interaction.reply(`✅`)
        
        //const noargs = new MessageEmbed()
        //.addField(`**Tên lệnh: ${name}**`,`> Thêm một bài hát vào hàng đợi và phát nó.`)
        //.addField(`**Cách sử dụng:**`,`> ${process.env.PREFIX}${name} [tên bài nhạc] - Phát kết quả đầu tiên từ Youtube \n > ${process.env.PREFIX}${name} [URL] - Phát bài hát, danh sách phát hoặc live stream`)
        //.addField(`**Ví dụ:**`, `> ${process.env.PREFIX}${name} never gonna give you up \n > ${process.env.PREFIX}${name} https://www.youtube.com/watch?v=dQw4w9WgXcQ`)\
        if (!interaction.member.voice.channel) return error(`Bạn cần trong kênh voice để sử dụng lệnh này!`)
        let song = interaction.options.getString("musics");
        const queue = client.distube.getQueue(interaction);
        //if (!music) return interaction.reply({embeds: [noargs]})
        try {
            await client.distube.play(
                interaction.member.voice.channel,
                song,
                {
                  textChannel: interaction.channel,
                  member: interaction.member
                })
            //client.distube.play(interaction.options.getString(" "));
        } catch (e) {
            console.error(e)
            console.log(e)
            error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
        }
    }
}