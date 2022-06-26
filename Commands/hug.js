const { MessageEmbed } = require('discord.js')
const Anime_Images = require('anime-images-api')
const API = new Anime_Images()

module.exports = {
    name: 'hug',
    description: 'Ôm người khác :D 🤗',
    options: [
        {
            name: 'user',
            description: 'Người bạn muốn ôm',
            type: 'USER',
            required: true,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply();
        let { image } = await API.sfw.hug()
        const user = interaction.options.getUser('user')
        //console.log(image)
        if (user.id == client.user.id) {
            const hugembed1 = new MessageEmbed()
                .setColor(`FF00C5`)
                .setDescription(`<@!${interaction.user.id}> đã ôm <@!${client.user.id}>! Wait what 😳`)
                .setImage(image)
                .setTimestamp()
            await interaction.editReply({ embeds: [hugembed1] })
            return
        }
        if (user.id == user.id) {
            const hugembed2 = new MessageEmbed()
                .setColor(`FF00C5`)
                .setDescription(`<@!${interaction.user.id}> đã ôm <@!${client.user.id}>! Ơ nhưng mà....tại sao? 🤔`)
                .setImage(image)
                .setTimestamp()
            await interaction.editReply({ embeds: [hugembed2] })
            return
        }
        const hugembed = new MessageEmbed()
            .setColor(`FF00C5`)
        hugembed.setDescription(`<@!${interaction.user.id}> đã ôm <@!${user.id}> 🤗`)
            .setImage(image)
            .setTimestamp()
        await interaction.editReply({ embeds: [hugembed] })
    }
}
