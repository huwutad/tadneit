const { MessageEmbed } = require("discord.js")
const { v2, auth } = require('osu-api-extended')
const { nguoidung } = require('../Events/dbSchema')
require('dotenv').config();
const name = 'osu'

module.exports = {
    name: 'osu',
    category: 'Osu!',
    description: 'Tìm thông tin của bạn trên osu! 🎶',
    options: [
        {
            name: 'name',
            description: 'Tên của bạn trên osu! Bancho server',
            type: 'STRING',
            required: false,
        }
    ],
    run: async (client, interaction, db) => {
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        let id = interaction.options.getString('name');
        await interaction.deferReply()
        if (!id) {
            const ten = await nguoidung.findById(interaction.user.id)
            if (!ten) {
                interaction.editReply({ content: `Nhập tên hoặc id của người bạn muốn tìm hoặc tên của bạn, \nHoặc sử dụng \`/osuset\` để set tên bạn vào database! `, ephemeral: true })
                return
            } else {
                id = ten.name
            }
        }
        await auth.login(process.env.OSUID, process.env.OSU)
        const search = await v2.search({ mode: 'user', query: id })
        if (!id || !search.user.data[0]) return interaction.editReply({ content: `\`Có vẻ như tui không tìm thấy người có tên ${id} 🤔\``, ephemeral: true })
        const user = await v2.user.get(search.user.data[0].id, 'osu')
        const mode = 'osu!standard'
        const t = Number(`${user.statistics.hit_accuracy}`)
        const d = Number(`${user.statistics.play_time}`)
        const n = Number(`${user.statistics.global_rank}`)
        const k = Number(`${user.statistics.play_count}`)
        const c = Number(`${user.statistics.country_rank}`)
        const play = Math.floor(d / 3600)
        const acc = Math.round(t * 100) / 100
        const q = Number(`${play}`)
        const country = `${user.country_code}`
        const progress = `${user.statistics.level.progress}`
        const stats = `${process.env.XH}\`${user.statistics.grade_counts.ssh}\`${process.env.X}\`${user.statistics.grade_counts.ss}\`${process.env.SH}\`${user.statistics.grade_counts.sh}\`${process.env.S}\`${user.statistics.grade_counts.s}\`${process.env.A}\`${user.statistics.grade_counts.a}\``
        //const x = `${user.statistics.grade_counts.ss}`
        //const xh = `${user.statistics.grade_counts.ssh}`
        //const sh = `${user.statistics.grade_counts.sh}`
        //const s = `${user.statistics.grade_counts.s}`
        //const a = `${user.statistics.grade_counts.a}`
        const osuembed = new MessageEmbed()
            .setAuthor({ name: `${mode} Profile của ${user.username}`, iconURL: 'https://cdn.discordapp.com/emojis/967444692369293313.webp?size=80&quality=lossless', url: `https://osu.ppy.sh/users/${user.id}` })
            .setThumbnail(user.avatar_url)
            .setColor(`RANDOM`)
            .setDescription(`➤ **Rank Bancho:** #${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} (${country}#${c.toLocaleString()}) \n➤ **Level:** ${user.statistics.level.current} + ${progress}.00% \n  ➤ **PP:** ${user.statistics.pp} | **Acc:** ${acc}% \n ➤ **PlayCount:** ${k.toLocaleString()} (${q.toLocaleString()}hrs) \n ➤ **Rankings:** ${stats}`)
            //.addField(`➤ Level:`, `${user.statistics.level.current}`, false)
            //.addField(`➤ Rank Bancho: `, `${n.toLocaleString()}`, false)
            //.addField(`➤ PP: `, `${user.statistics.pp}`, false)
            //.addField(`➤ PlayCount: `, `${k.toLocaleString()}(${q.toLocaleString()})`, false)
            //.addField(`➤ Rankings: `, `${stats}`, false)
            .setFooter({ text: `${user.username} đang ${user.is_online ? 'online 🟢' : 'offline 🔴'}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
        await interaction.editReply({ embeds: [osuembed] })
        //console.log(user, mode)
    }
}