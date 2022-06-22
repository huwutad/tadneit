const { MessageEmbed } = require('discord.js');
const { v2, auth } = require('osu-api-extended')
const { nguoidung } = require('../Events/dbSchema.js');
require('dotenv').config
const name = 'osuset'

module.exports = {
    name: 'osuset',
    category: 'Osu',
    description: 'Set tên osu! của bạn! 🎶',
    options: [
        {
            name: 'name',
            description: 'Tên của bạn trên osu! Bancho server',
            type: 'STRING',
            required: true,
        }
    ],
    run: async (client, interaction, db) => {
        await interaction.deferReply()
        const newname = interaction.options.getString('name')
        if (newname.length > 15 ) { 
            interaction.editReply({content: `\`Không thấy ${newname} trong Bancho server, set tên đúng đi :D\``, ephemeral: true})
            return
        }   
        const id = interaction.user.id
        const ten = await nguoidung.findById(id)
        //console.log(ten)
        if (!ten) {
            await auth.login(process.env.OSUID, process.env.OSU)     
            const search = await v2.search({mode: 'user', query: newname})
            if (!newname || !search.user.data[0]) return interaction.editReply({content: `\`Không thấy ${newname} trong Bancho server, set tên đúng đi :D\``, ephemeral: true})
            new nguoidung({
                _id: id,
                name: newname,
            }).save();
        }
        if (ten) {
            await auth.login(process.env.OSUID, process.env.OSU)     
            const search = await v2.search({mode: 'user', query: newname})
            if (!newname || !search.user.data[0]) return interaction.editReply({content: `\`Không thấy ${newname} trong Bancho server, set tên đúng đi :D\``, ephemeral: true})
            await ten.update({
                name: newname,
            })
        }
        await interaction.editReply({ content: `**${interaction.user.username}, tên của bạn trên server \`Bancho\` đã được set là: \`${newname}\`**` })
    }
}