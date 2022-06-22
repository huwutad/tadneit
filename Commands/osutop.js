const { MessageEmbed, UserFlags } = require('discord.js');
const { v2, auth } = require('osu-api-extended');
const { nguoidung } = require('../Events/dbSchema')
require('dotenv').config
const name = 'osutop'

module.exports = {
    name: 'osutop',
    category: 'Osu',
    description: 'Xem top các score của bạn trên osu! 🎶',
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
        await interaction.deferReply();
        let id = interaction.options.getString('name');
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
        const top = await v2.scores.users.best(search.user.data[0].id, 'osu')
        const mode = 'osu!standard'
        const searchmap0 = await v2.beatmap.get(top[0].beatmap.id);
        const searchmap1 = await v2.beatmap.get(top[1].beatmap.id);
        const searchmap2 = await v2.beatmap.get(top[2].beatmap.id);
        const searchmap3 = await v2.beatmap.get(top[3].beatmap.id);
        const searchmap4 = await v2.beatmap.get(top[4].beatmap.id);
        if (top[0].rank == 'A') osuRank = process.env.A
        if (top[0].rank == 'B') osuRank = process.env.B
        if (top[0].rank == 'C') osuRank = process.env.C
        if (top[0].rank == 'D') osuRank = process.env.D
        if (top[0].rank == 'S') osuRank = process.env.S
        if (top[0].rank == 'X') osuRank = process.env.X
        if (top[0].rank == 'SH') osuRank = process.env.SH
        if (top[0].rank == 'XH') osuRank = process.env.XH
        const p = Number(`${top[0].pp}`)
        const g = Number(`${top[0].accuracy}`)
        const q = Number(`${top[0].score}`)
        const o = g * 100;
        const r = Math.round(o * 100) / 100
        const pp = Math.round(p * 100) / 100
        if (!id || !search.user.data[0]) return interaction.editReply({ content: `\`Không tim thấy ${id} 😉\``, ephemeral: true })
        if (top[0].pp == 'null') top[0].pp = `0.00`
        if (top[1].pp == 'null') top[1].pp = `0.00`
        if (top[2].pp == 'null') top[2].pp = `0.00`
        if (top[3].pp == 'null') top[3].pp = `0.00`
        if (top[4].pp == 'null') top[4].pp = `0.00`
        if (top[0].mods == '') top[0].mods = `Không mod`
        if (top[1].mods == '') top[0].mods = `Không mod`
        if (top[2].mods == '') top[0].mods = `Không mod`
        if (top[3].mods == '') top[0].mods = `Không mod`
        if (top[4].mods == '') top[0].mods = `Không mod`
        const osutopembed = new MessageEmbed()
            .setAuthor(`Top 5 Score tốt nhất của ${top[0].user.username} trên osu!Standard`, 'https://cdn.discordapp.com/emojis/967444692369293313.webp?size=80&quality=lossless', `https://osu.ppy.sh/users/${top[0].id}`)
            .setColor(`RANDOM`)
            .setThumbnail(top[0].user.avatar_url)
            .setDescription(`**1. [${top[0].beatmapset.title} ${top[0].beatmap.version}](${top[0].beatmap.url}) +${top[0].mods}** [${top[0].beatmap.difficulty_rating}⭐] \n ➤ ${osuRank} ・ **${pp}PP** ・${r}% \n ${q.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[0].max_combo}/${searchmap0.max_combo}・[${top[0].statistics.count_300}/${top[0].statistics.count_100}/${top[0].statistics.count_50}/${top[0].statistics.count_miss}] \n**2. [${top[1].beatmapset.title} ${top[1].beatmap.version}](${top[1].beatmap.url}) +${top[0].mods}** [${top[1].beatmap.difficulty_rating}⭐] \n ➤ ${osuRank} ・ **${pp}PP** ・${r}% \n ${q.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[1].max_combo}/${searchmap0.max_combo}・[${top[1].statistics.count_300}/${top[1].statistics.count_100}/${top[1].statistics.count_50}/${top[1].statistics.count_miss}] \n**3. [${top[2].beatmapset.title} ${top[2].beatmap.version}](${top[2].beatmap.url}) +${top[0].mods}** [${top[2].beatmap.difficulty_rating}⭐] \n ➤ ${osuRank} ・ **${pp}PP** ・${r}% \n ${q.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[2].max_combo}/${searchmap0.max_combo}・[${top[2].statistics.count_300}/${top[2].statistics.count_100}/${top[2].statistics.count_50}/${top[2].statistics.count_miss}] \n **4. [${top[3].beatmapset.title} ${top[3].beatmap.version}](${top[3].beatmap.url}) +${top[0].mods}** [${top[3].beatmap.difficulty_rating}⭐] \n ➤ ${osuRank} ・ **${pp}PP** ・${r}% \n ${q.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[3].max_combo}/${searchmap0.max_combo}・[${top[3].statistics.count_300}/${top[3].statistics.count_100}/${top[3].statistics.count_50}/${top[3].statistics.count_miss}] \n**5. [${top[4].beatmapset.title} ${top[4].beatmap.version}](${top[4].beatmap.url}) +${top[0].mods}** [${top[4].beatmap.difficulty_rating}⭐] \n ➤ ${osuRank} ・ **${pp}PP** ・${r}% \n ${q.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[4].max_combo}/${searchmap0.max_combo}・[${top[4].statistics.count_300}/${top[4].statistics.count_100}/${top[4].statistics.count_50}/${top[4].statistics.count_miss}] \n`)
            // .addFields(
            //     {
            //         name: '** **',
            //         value: `**1. [${top[0].beatmapset.title} ${top[0].beatmap.version}](${top[0].beatmap.url}) +${top[0].mods}** [${top[0].beatmap.difficulty_rating}⭐] \n ➤ ${osuRank} ・ **${pp}PP** ・${r}% \n ${q.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[0].max_combo}/${searchmap0.max_combo}・[${top[0].statistics.count_300}/${top[0].statistics.count_100}/${top[0].statistics.count_50}/${top[0].statistics.count_miss}]`,
            //     },
            //     {
            //         name: '** **',
            //         value: `**2. [${top[1].beatmapset.title} ${top[1].beatmap.version}](${top[1].beatmap.url}) +${top[0].mods}** [${top[1].beatmap.difficulty_rating}⭐] \n ➤ ${osuRank} ・ **${pp}PP** ・${r}% \n ${q.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[1].max_combo}/${searchmap0.max_combo}・[${top[1].statistics.count_300}/${top[1].statistics.count_100}/${top[1].statistics.count_50}/${top[1].statistics.count_miss}]`,
            //     },
            //     {
            //         name: '** **',
            //         value: `**3. [${top[2].beatmapset.title} ${top[2].beatmap.version}](${top[2].beatmap.url}) +${top[0].mods}** [${top[2].beatmap.difficulty_rating}⭐] \n ➤ ${osuRank} ・ **${pp}PP** ・${r}% \n ${q.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[2].max_combo}/${searchmap0.max_combo}・[${top[2].statistics.count_300}/${top[2].statistics.count_100}/${top[2].statistics.count_50}/${top[2].statistics.count_miss}]`,
            //     },
            //     {
            //         name: '** **',
            //         value: `**4. [${top[3].beatmapset.title} ${top[3].beatmap.version}](${top[3].beatmap.url}) +${top[0].mods}** [${top[3].beatmap.difficulty_rating}⭐] \n ➤ ${osuRank} ・ **${pp}PP** ・${r}% \n ${q.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[3].max_combo}/${searchmap0.max_combo}・[${top[3].statistics.count_300}/${top[3].statistics.count_100}/${top[3].statistics.count_50}/${top[3].statistics.count_miss}]`,
            //     },
            //     {
            //         name: '** **',
            //         value: `**5. [${top[4].beatmapset.title} ${top[4].beatmap.version}](${top[4].beatmap.url}) +${top[0].mods}** [${top[4].beatmap.difficulty_rating}⭐] \n ➤ ${osuRank} ・ **${pp}PP** ・${r}% \n ${q.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[4].max_combo}/${searchmap0.max_combo}・[${top[4].statistics.count_300}/${top[4].statistics.count_100}/${top[4].statistics.count_50}/${top[4].statistics.count_miss}]`,
            //     },
            // )
        await interaction.editReply({ embeds: [osutopembed] })
        //console.log(top)
        //console.log(searchmap)
    }
}