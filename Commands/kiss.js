const { MessageEmbed } = require('discord.js')
const Anime_Images = require('anime-images-api')
const API = new Anime_Images()
const name =  'kiss'

module.exports = {
    name: 'kiss',
    description: 'Hôn người khác :D 😚',
    options: [
        {
            name: 'user',
            description: 'Người bạn muốn hôn',
            type: 'USER',
            required: true,
        }
    ],
    run: async (client, interaction) => {
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        await interaction.deferReply();
        let { image } = await API.sfw.kiss()
        const user = interaction.options.getUser('user')
        //console.log(image)
        if (user.id == client.user.id) {
            const kissembed1 = new MessageEmbed()
                .setColor(`FF00C5`)
                .setDescription(`<@!${interaction.user.id}> đã hôn <@!${client.user.id}>! Wait what 😳`)
                .setImage(image)
                .setTimestamp()
            await interaction.editReply({ embeds: [kissembed1] })
            return
        }
        if (interaction.user.id == user.id) {
            const kissembed2 = new MessageEmbed()
                .setColor(`FF00C5`)
                .setDescription(`<@!${interaction.user.id}> đã hôn <@!${user.id}>! Ơ nhưng mà....tại sao? 🤔`)
                .setImage(image)
                .setTimestamp()
            await interaction.editReply({ embeds: [kissembed2] })
            return
        }
        const kissembed = new MessageEmbed()
            .setColor(`FF00C5`)
        kissembed.setDescription(`<@!${interaction.user.id}> đã hôn <@!${user.id}> 😚`)
            .setImage(image)
            .setTimestamp()
        await interaction.editReply({ embeds: [kissembed] })
    }
}
