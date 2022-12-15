const { MessageEmbed } = require('discord.js')
const Anime_Images = require('anime-images-api')
const API = new Anime_Images()
const name = 'punch'

module.exports = {
    name: 'punch',
    description: 'Đấm người khác :D 👊',
    options: [
        {
            name: 'user',
            description: 'Người bạn muốn đấm',
            type: 'USER',
            required: true,
        }
    ],
    run: async (client, interaction) => {
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        await interaction.deferReply();
        let { image } = await API.sfw.punch()
        const user = interaction.options.getUser('user')
        //console.log(image)
        if (user.id == client.user.id) {
            const punchembed1 = new MessageEmbed()
                .setColor(`FF00C5`)
                .setDescription(`<@!${interaction.user.id}> đã đấm <@!${client.user.id}>! Wait what 💀`)
                .setImage(image)
                .setTimestamp()
            await interaction.editReply({ embeds: [punchembed1] })
            return
        }
        if (interaction.user.id == user.id) {
            const punchembed2 = new MessageEmbed()
                .setColor(`FF00C5`)
                .setDescription(`<@!${interaction.user.id}> đã đấm <@!${user.id}>! Ơ nhưng mà....tại sao? 🤔`)
                .setImage(image)
                .setTimestamp()
            await interaction.editReply({ embeds: [punchembed2] })
            return
        }
        const punchembed = new MessageEmbed()
            .setColor(`FF00C5`)
        punchembed.setDescription(`<@!${interaction.user.id}> đã đấm <@!${user.id}> 👊`)
            .setImage(image)
            .setTimestamp()
        await interaction.editReply({ embeds: [punchembed] })
    }
}
