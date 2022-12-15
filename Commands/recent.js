const { MessageEmbed, UserFlags } = require('discord.js');
const { v2, auth } = require('osu-api-extended')
const { nguoidung } = require('../Events/dbSchema')
require('dotenv').config
const name  = 'recent'

module.exports = {
    name: 'recnet',
    category: 'Osu',
    description: 'Xem score osu! của bạn gần nhất! 🎶',
    options: [
        {
            name: 'name',
            description: 'Tên của bạn trên osu! Bancho server',
            type: 'STRING',
            required: false,
        }
    ],
    run: async (client, interaction, array) => {
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        let id = interaction.options.getString('name');
        await interaction.deferReply()
        if (!id) {
            const ten = await nguoidung.findById(interaction.user.id)
            if (!ten) {
                interaction.reply({ content: `Nhập tên hoặc id của người bạn muốn tìm hoặc tên của bạn, \nHoặc sử dụng \`/osuset\` để set tên bạn vào database! `, ephemeral: true })
                return
            } else {
                id = ten.name
            }
        }
        await auth.login(process.env.OSUID, process.env.OSU)     
        const search = await v2.search({mode: 'user', query: id})
        const rs = await v2.scores.users.recent(search.user.data[0].id, 'osu')
        const mode = 'osu!standard'
        const searchmap = await v2.beatmap.get(rs[0].beatmap.id);
        if (!id || !search.user.data[0]) return interaction.reply({content: `\`Không tim thấy ${id} 😉\``, ephemeral: true})
        if (rs[0].beatmap.status === "ranked") rs[0].beatmap.status = "đã được xếp hạng!"
        if (rs[0].beatmap.status === "graveyard") rs[0].beatmap.status = "chưa được xếp hạng!"
        if (rs[0].rank == 'A') osuRank = process.env.A
        if (rs[0].rank == 'B') osuRank = process.env.B
        if (rs[0].rank == 'C') osuRank = process.env.C
        if (rs[0].rank == 'D') osuRank = process.env.D
        if (rs[0].rank == 'S') osuRank = process.env.S
        if (rs[0].rank == 'X') osuRank = process.env.X
        if (rs[0].rank == 'SH') osuRank = process.env.SH
        if (rs[0].rank == 'XH') osuRank = process.env.XH
        if (rs[0].pp == null) rs[0].pp = `0.00`
        if (rs[0].mods == '') rs[0].mods = `Không mod`
        //console.log(rs[0].pp)
        const g = Number(`${rs[0].accuracy}`)
        const q = Number(`${rs[0].score}`)
        const p = Number(`${rs[0].pp}`)
        const o = g * 100;
        const r = Math.round(o * 100) / 100
        const pp = Math.round(p * 100) / 100
        const recent = new MessageEmbed()
        .setColor(`RANDOM`)
        .setAuthor(`${rs[0].beatmapset.title} [${rs[0].beatmap.version}] + ${rs[0].mods} [${rs[0].beatmap.difficulty_rating}⭐]`, rs[0].user.avatar_url, `${rs[0].beatmap.url}`)
        .setThumbnail(searchmap.beatmapset.covers.list)
        .setDescription(`➤ **Rank:** ${osuRank}・**${pp}PP**・**Điểm:** ${q.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} \n ➤ **Acc:** ${r}%・[${rs[0].statistics.count_300}/${rs[0].statistics.count_100}/${rs[0].statistics.count_50}/${rs[0].statistics.count_miss}]・**Combo:** x${rs[0].max_combo}/${searchmap.max_combo}`)
        .setFooter(`BeatMap ${rs[0].beatmap.status}`, client.user.displayAvatarURL())
        await interaction.editReply({content: `**Điểm osu!Standard của ${rs[0].user.username}**:`,embeds: [recent]})
        //console.log(rs)
        //console.log(searchmap)
    }
}