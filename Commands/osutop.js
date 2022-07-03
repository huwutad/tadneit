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
    run: async (client, interaction) => {
        function error(error) {
            const lomao = new MessageEmbed()
                .setColor('RED')
                .setDescription(`\`🚫\`| ${error}`)
            interaction.reply({ embeds: [lomao], ephemeral: true })
        }
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        // await interaction.deferReply();
        try {
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
            if (!id || !search.user.data[0]) {
                interaction.editReply({ content: `\`Không tim thấy ${id} 😉\``, ephemeral: true })
                return
            }
            if (top == '[]') {
                interaction.reply(`${id} không được tìm thấy hoặc không có đủ lượt chơi!`)
            } else {
                const mode = 'osu!standard'
                // A 
                if (top[0].rank == 'A') top[0].rank = process.env.A
                if (top[1].rank == 'A') top[1].rank = process.env.A
                if (top[2].rank == 'A') top[2].rank = process.env.A
                if (top[3].rank == 'A') top[3].rank = process.env.A
                if (top[4].rank == 'A') top[4].rank = process.env.A
                // B 
                if (top[0].rank == 'B') top[0].rank = process.env.B
                if (top[1].rank == 'B') top[1].rank = process.env.B
                if (top[2].rank == 'B') top[2].rank = process.env.B
                if (top[3].rank == 'B') top[3].rank = process.env.B
                if (top[4].rank == 'B') top[4].rank = process.env.B
                // C 
                if (top[0].rank == 'C') top[0].rank = process.env.C
                if (top[1].rank == 'C') top[1].rank = process.env.C
                if (top[2].rank == 'C') top[2].rank = process.env.C
                if (top[3].rank == 'C') top[3].rank = process.env.C
                if (top[4].rank == 'C') top[4].rank = process.env.C
                // D
                if (top[0].rank == 'D') top[0].rank = process.env.D
                if (top[1].rank == 'D') top[1].rank = process.env.D
                if (top[2].rank == 'D') top[2].rank = process.env.D
                if (top[3].rank == 'D') top[3].rank = process.env.D
                if (top[4].rank == 'D') top[4].rank = process.env.D
                // S
                if (top[0].rank == 'S') top[0].rank = process.env.S
                if (top[1].rank == 'S') top[1].rank = process.env.S
                if (top[2].rank == 'S') top[2].rank = process.env.S
                if (top[3].rank == 'S') top[3].rank = process.env.S
                if (top[4].rank == 'S') top[4].rank = process.env.S
                // X
                if (top[0].rank == 'X') top[0].rank = process.env.X
                if (top[1].rank == 'X') top[1].rank = process.env.X
                if (top[2].rank == 'X') top[2].rank = process.env.X
                if (top[3].rank == 'X') top[3].rank = process.env.X
                if (top[4].rank == 'X') top[4].rank = process.env.X
                // SH
                if (top[0].rank == 'SH') top[0].rank = process.env.SH
                if (top[1].rank == 'SH') top[1].rank = process.env.SH
                if (top[2].rank == 'SH') top[2].rank = process.env.SH
                if (top[3].rank == 'SH') top[3].rank = process.env.SH
                if (top[4].rank == 'SH') top[4].rank = process.env.SH
                // XH
                if (top[0].rank == 'XH') top[0].rank = process.env.XH
                if (top[1].rank == 'XH') top[1].rank = process.env.XH
                if (top[2].rank == 'XH') top[2].rank = process.env.XH
                if (top[3].rank == 'XH') top[3].rank = process.env.XH
                if (top[4].rank == 'XH') top[4].rank = process.env.XH

                const p0 = Number(`${top[0].pp}`)
                const p1 = Number(`${top[1].pp}`)
                const p2 = Number(`${top[2].pp}`)
                const p3 = Number(`${top[3].pp}`)
                const p4 = Number(`${top[4].pp}`)
                const g = Number(`${top[0].accuracy}`)
                // score
                const q0 = Number(`${top[0].score}`)
                const q1 = Number(`${top[1].score}`)
                const q2 = Number(`${top[2].score}`)
                const q3 = Number(`${top[3].score}`)
                const q4 = Number(`${top[4].score}`)
                const o = g * 100;
                const r = Math.round(o * 100) / 100
                const pp0 = Math.round(p0 * 100) / 100
                const pp1 = Math.round(p1 * 100) / 100
                const pp2 = Math.round(p2 * 100) / 100
                const pp3 = Math.round(p3 * 100) / 100
                const pp4 = Math.round(p4 * 100) / 100
                if (top[0].pp == 'null') top[0].pp = `0.00`
                if (top[1].pp == 'null') top[1].pp = `0.00`
                if (top[2].pp == 'null') top[2].pp = `0.00`
                if (top[3].pp == 'null') top[3].pp = `0.00`
                if (top[4].pp == 'null') top[4].pp = `0.00`
                if (top[0].mods == '') top[0].mods = `Không mod`
                if (top[1].mods == '') top[1].mods = `Không mod`
                if (top[2].mods == '') top[2].mods = `Không mod`
                if (top[3].mods == '') top[3].mods = `Không mod`
                if (top[4].mods == '') top[4].mods = `Không mod`
                const searchmap0 = await v2.beatmap.get(top[0].beatmap.id);
                const searchmap1 = await v2.beatmap.get(top[1].beatmap.id);
                const searchmap2 = await v2.beatmap.get(top[2].beatmap.id);
                const searchmap3 = await v2.beatmap.get(top[3].beatmap.id);
                const searchmap4 = await v2.beatmap.get(top[4].beatmap.id);
                const osutopembed = new MessageEmbed()
                    .setAuthor(`Top 5 Score tốt nhất của ${top[0].user.username} trên osu!Standard`, 'https://cdn.discordapp.com/emojis/967444692369293313.webp?size=80&quality=lossless', `https://osu.ppy.sh/users/${top[0].id}`)
                    .setColor(`RANDOM`)
                    .setThumbnail(top[0].user.avatar_url)
                    //.setDescription(top.map((value, index) => { `${index + 1}. [${value.beatmapset.title} ${value.beatmap.version}](${value.beatmap.url}) +** ${value.mods}** [${value.beatmap.difficulty_rating}:star:] \n ➤ ${osuRank} ・ **${pp0}PP** ・${r}% \n ${value.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${value.max_combo}/${await searchmap(value.beatmap.id)}・[${value.statistics.count_300}/${value.statistics.count_100}/${value.statistics.count_50}/${value.statistics.count_miss}]`}).join("\n"))
                    .setDescription(`**1. [${top[0].beatmapset.title} ${top[0].beatmap.version}](${top[0].beatmap.url})** [${top[0].beatmap.difficulty_rating}⭐] \n ➤ **Mods: ${top[0].mods}** \n ➤ ${top[0].rank} ・ **${pp0}PP** ・${r}% \n ➤ ${q0.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[0].max_combo}/${searchmap0.max_combo}・[${top[0].statistics.count_300}/${top[0].statistics.count_100}/${top[0].statistics.count_50}/${top[0].statistics.count_miss}] \n**2. [${top[1].beatmapset.title} ${top[1].beatmap.version}](${top[1].beatmap.url}) ** [${top[1].beatmap.difficulty_rating}⭐] \n ➤ **Mods: ${top[1].mods}** \n ➤ ${top[1].rank} ・ **${pp1}PP** ・${r}% \n ➤ ${q1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[1].max_combo}/${searchmap1.max_combo}・[${top[1].statistics.count_300}/${top[1].statistics.count_100}/${top[1].statistics.count_50}/${top[1].statistics.count_miss}] \n**3. [${top[2].beatmapset.title} ${top[2].beatmap.version}](${top[2].beatmap.url}) ** [${top[2].beatmap.difficulty_rating}⭐] \n ➤ **Mods: ${top[2].mods}** \n ➤ ${top[2].rank} ・ **${pp2}PP** ・${r}% \n ➤ ${q2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[2].max_combo}/${searchmap2.max_combo}・[${top[2].statistics.count_300}/${top[2].statistics.count_100}/${top[2].statistics.count_50}/${top[2].statistics.count_miss}] \n **4. [${top[3].beatmapset.title} ${top[3].beatmap.version}](${top[3].beatmap.url}) ** [${top[3].beatmap.difficulty_rating}⭐] \n ➤ **Mods: ${top[3].mods}** \n ➤ ${top[3].rank} ・ **${pp3}PP** ・${r}% \n ➤ ${q3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[3].max_combo}/${searchmap3.max_combo}・[${top[3].statistics.count_300}/${top[3].statistics.count_100}/${top[3].statistics.count_50}/${top[3].statistics.count_miss}] \n**5. [${top[4].beatmapset.title} ${top[4].beatmap.version}](${top[4].beatmap.url}) ** [${top[4].beatmap.difficulty_rating}⭐] \n ➤ **Mods: ${top[3].mods}** \n ➤ ${top[4].rank} ・ **${pp4}PP** ・${r}% \n ➤ ${q4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ・ x${top[4].max_combo}/${searchmap4.max_combo}・[${top[4].statistics.count_300}/${top[4].statistics.count_100}/${top[4].statistics.count_50}/${top[4].statistics.count_miss}] \n`)
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
                    .setTimestamp()
                await interaction.reply({ embeds: [osutopembed] })
                //console.log(top)
                //console.log(searchmap) 
            }
        } catch (e) {
            console.error(e)
            await error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
        }
    }
}