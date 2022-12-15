const { MessageEmbed } = require('discord.js')
const Anime_Images = require('anime-images-api')
const API = new Anime_Images()
const name = 'slap'

module.exports = {
    name: 'slap',
    description: 'Tát người khác :D 🤚',
    options: [
        {
            name: 'user',
            description: 'Người bạn muốn tát',
            type: 'USER',
            required: true,
        }
    ],
    run: async (client, interaction) => {
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        await interaction.deferReply();
        let { image } = await API.sfw.slap()
        const user = interaction.options.getUser('user')
        //console.log(image)
        if (user.id == client.user.id) {
            const slapembed1 = new MessageEmbed()
                .setColor(`FF00C5`)
                .setDescription(`<@!${interaction.user.id}> đã tát <@!${client.user.id}>! Wait what 💀`)
                .setImage(image)
                .setTimestamp()
            await interaction.editReply({ embeds: [slapembed1] })
            return
        }
        if (interaction.user.id == user.id) {
            const slapembed2 = new MessageEmbed()
                .setColor(`FF00C5`)
                .setDescription(`<@!${interaction.user.id}> đã tát <@!${user.id}>! Ơ nhưng mà....tại sao? 🤔`)
                .setImage(image)
                .setTimestamp()
            await interaction.editReply({ embeds: [slapembed2] })
            return
        }
        const slapembed = new MessageEmbed()
            .setColor(`FF00C5`)
        slapembed.setDescription(`<@!${interaction.user.id}> đã tát <@!${user.id}> 🤚`)
            .setImage(image)
            .setTimestamp()
        await interaction.editReply({ embeds: [slapembed] })
    }
}
