const { MessageEmbed} = require('discord.js');
const moment = require('moment')

const name = 'whois'
require('dotenv').config
module.exports = {
    name: 'whois',
    description: 'Xem thông tin của ai đó',
    options: [
        {
            name: 'name',
            description: 'Xem thông tin của ai đó! ',
            type: 'USER',
            required: false,
        }
    ],
    run: (client, interaction, args) => {
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
            function error(error) {
                const lomao = new MessageEmbed()
                .setColor('RED')
                .setDescription(`\`🚫\` | ${error}`)
                interaction.reply({embeds: [lomao], allowedMentions: {repliedUser: false}})
            }
    
            function success(success) {
                const thanhcong = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`\`✅\` | ${success}`)
                interaction.reply({embeds: [thanhcong], allowedMentions: {repliedUser: false}})
            }
        try {
        const id = interaction.options.getString('id') || interaction.user;
        let member = interaction.mentions.members.first() || interaction.guild.members.cache.get(id) || interaction.member
        const avatarUsers = member.user.avatarURL({format: 'png', dynamic: true, size: 1024})
        const createtime= member.user.createdAt.toLocaleString()
        const createday = new Date(createtime)
        const createago = Math.floor(createday.getTime()/1000.0)
        const jointime = member.joinedAt.toLocaleString()
        const joinday = new Date(jointime)
        const joinago = Math.floor(joinday.getTime()/1000.0)
        const infoEmbed = new MessageEmbed()
        infoEmbed.setAuthor({name: `@${member.user.tag}`, iconURL: client.user.displayAvatarURL()})
        .setColor(`RANDOM`) /*#0372d7*/
        .addField('Tên 📛', `${member.user.username}`, true)
        .addField('Tag 📌', `${member.user.discriminator}`, true)
        .addField('Join server lúc ⏱', `${jointime.split(',').shift()} (<t:${joinago}:R>)`)
        .addField('Account được tạo lúc ⌚', `${createtime.split(',').shift()} (<t:${createago}:R>)`, true)
        .addField('ID người dùng 📋', `${member.id}`)
        .setThumbnail(avatarUsers)
        .setFooter(`Được yêu cầu bởi ${interaction.author.tag} • ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        interaction.reply({embeds: [infoEmbed], allowedMentions: {repliedUser: false}})
    }catch (e) {
        console.error(e)
        console.log(e)
        error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
        }
    }
}   