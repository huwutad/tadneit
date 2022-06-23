const { MessageEmbed, Client, CommandInteraction } = require('discord.js')
const name = 'avatar'
require('dotenv').config();
module.exports = {
    name: "avatar",
    category: 'User',
    description: 'Xem avatar của người khác 📷',
    type: 'CHAT_INPUT',
    options: [
        {
        name: 'user',
        description: 'Người bạn muốn lấy avatar',
        type: 'USER',
        required: false,
        }
    ],
    run: async (client, interaction) => {
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        let user = interaction.options.getUser('user') || interaction.user;
        const urlpng = user.displayAvatarURL({ format: 'png', size: 1024, dynamic: true })
        const urljpg = user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024})
        const urlwebp = user.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024}) 
        const url = user.displayAvatarURL({ format: 'png', size: 1024, dynamic: true })
        const avtembed = new MessageEmbed()
        .setColor(`RANDOM`)
        .setAuthor(`Ảnh đại diện của ${user.username}`,user.displayAvatarURL({dynamic: true}))
        .setImage(url)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .addField(`PNG     ${process.env.ARROW}   `, `[\`here\`](${urlpng})`, true)
        .addField(`JPG     ${process.env.ARROW}`, "[`here`](" + urljpg + ")", true)
        .addField(`WEBP`, "[`here`](" + urlwebp + ")", true)
        interaction.reply({embeds: [avtembed]})

    }
}