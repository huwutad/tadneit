const { MessageEmbed } = require('discord.js');
const moment = require('moment')

const name = 'whois'
require('dotenv').config
module.exports = {
    name: 'whois',
    description: 'Xem thông tin của ai đó! 📨',
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
            interaction.reply({ embeds: [lomao], ephemeral: true })
        }

        function success(success) {
            const thanhcong = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`\`✅\` | ${success}`)
            interaction.reply({ embeds: [thanhcong], ephemeral: true })
        }
        // try {
        let user = interaction.options.getUser('name') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id)
        const avatarUsers = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
        // ngày tạo
        const createtime = user.createdAt
        const createday = new Date(createtime)
        const createago = Math.floor(createday.getTime() / 1000.0)
        // ngày tham gia
        const jointime = member.joinedAt
        const joinday = new Date(jointime)
        const joinago = Math.floor(joinday.getTime() / 1000.0)
        //console.log(jointime)
        if (member.nickname == null) member.nickname = `Không có`
        //console.log(member.nickname)
        const infoEmbed = new MessageEmbed()
        infoEmbed.setAuthor({ name: `${user.username}`, iconURL: client.user.displayAvatarURL() })
            .setColor(`RANDOM`) /*#0372d7*/
            .addField('Tên 📛:', `${user.username}`, true)
            .addField('Tag 📌:', `${user.tag}`, true)
            .addField('Nickname 🎟:', `${member.nickname}`, true)
            .addField('Join server lúc ⏱:', `(<t:${joinago}:F>)`)
            .addField('Account được tạo lúc ⌚:', `(<t:${createago}:F>)`, true)
            .addField('ID người dùng 📋', `${user.id}`)
            .setThumbnail(avatarUsers)
            //.setFooter(`Được yêu cầu bởi ${interaction.user.username} `, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        interaction.reply({ embeds: [infoEmbed] })
        // }catch (e) {
        //     console.error(e)
        //     console.log(e)
        //     error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
        //     }
    }
}   