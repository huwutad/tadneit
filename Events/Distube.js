const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = async (client, interaction) => {
    const status = queue =>
        `Âm lượng: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Tắt❌'
        }\` | Lặp lại: \`${queue.repeatMode
            ? queue.repeatMode === 2
                ? 'Tất cả bài nhạc!'
                : 'Một bài nhạc!'
            : 'Tắt❌'
        }\` | Tự động phát: \`${queue.autoplay ? 'Bật✅' : 'Tắt❌'}\``
    async function error(error) {
        const lomao2 = new MessageEmbed()
            .setColor('RED')
            .setDescription(`\`❌\` | ${error}`)
        const ẻrỏ = await interaction.followUp({ embeds: [lomao2], ephemeral: true })
        setTimeout(() => {
            ẻrỏ.delete()
        }, 5000)
    }

    async function success(success) {
        const thanhcong2 = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`\`✅\` | ${success}`)
        const tc = await interaction.followUp({ embeds: [thanhcong2], ephemeral: true })
        setTimeout(() => {
            tc.delete()
        }, 5000)
    }
    client.distube
        .on('playSong', async (queue, song, message) => {
            const play = new MessageEmbed()
                .setTitle(`🎶${song.name}🎶`)
                .setURL(song.url)
                .setColor(`RANDOM`)
                .setAuthor(`Bài hát đang được phát......`, 'https://c.tenor.com/sce9SDRey4EAAAAi/disc.gif')
                .setDescription(`${status(queue)}`)
                .setThumbnail(song.thumbnail)
                .addField(`Thời lượng ⏲:`, `${song.formattedDuration}`)
                .addField('Người đăng tải 🤘:', `[${song.uploader.name}](${song.uploader.url})`, true)
                .addField('Lượt xem 👀:', `\`${song.views}\``, true)
                .addField('Lượt thích 👍:', `\`${song.likes}\``, true)
                .addField(`Được yêu cầu bởi 💡:`, `${song.user} ✅`)
                .setTimestamp()
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('pause')
                        .setLabel('⏸')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId('skip')
                        .setLabel('⏩')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('loop')
                        .setLabel('🔁')
                        .setStyle('PRIMARY'),
                );
            const row2 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('volumeDown')
                        .setLabel('🔉')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('volumeUp')
                        .setLabel('🔊')
                        .setStyle('PRIMARY'),
                )
            const huylmao = await queue.textChannel.send({ embeds: [play], components: [row] })

            function huylomao() {
                setTimeout(() => {
                    const play2 = new MessageEmbed()
                        .setTitle(`🎶${song.name}🎶`)
                        .setURL(song.url)
                        .setColor(`RANDOM`)
                        .setAuthor(`Bài hát đang được phát......`, 'https://c.tenor.com/sce9SDRey4EAAAAi/disc.gif')
                        .setDescription(`${status(queue)}`)
                        .setThumbnail(song.thumbnail)
                        .addField(`Thời lượng ⏲:`, `${song.formattedDuration}`)
                        .addField('Người đăng tải 🤘:', `[${song.uploader.name}](${song.uploader.url})`, true)
                        .addField('Lượt xem 👀:', `\`${song.views}\``, true)
                        .addField('Lượt thích 👍:', `\`${song.likes}\``, true)
                        .addField(`Được yêu cầu bởi 💡:`, `${song.user} ✅`)
                        .setTimestamp()
                    huylmao.edit({ embeds: [play2], components: [row] })
                    if (queue.currentTime.length == 0) huylmao.delete()
                    huylomao()
                }, 5000);
            }
            huylomao()
        })
    client.distube.on('addSong', async (queue, song) => {
        queue.textChannel.send(`Đã thêm **${song.name}** vào hàng chờ bởi ${song.user}`,)
        //setTimeout((addsong) => {
        //    d.delete()
        //}, 10000)
    })
    client.distube.on('addList', (queue, playlist, e) => {
        function success(success) {
            const drac = new MessageEmbed()
                .setColor('RED')
                .setDescription(`\`❌\` | ${success}`)
            queue.textChannel.send({ embeds: [drac] })
        }
        if (String(e).search('Error [PlayError]')) return success(`Không tìm thấy danh sách phát đó!`)
        queue.textChannel.send(`Đã thêm danh sách phát **${playlist.name}** (${playlist.songs.length} bài hát) vào hàng chờ `,)
    })
    client.distube.on('error', ( textChannel, e) => {
        console.error(e)
        function error(error) {
            const lomao = new MessageEmbed()
                .setColor('RED')
                .setDescription(`\`❌\` | ${error}`)
            textChannel.send({ embeds: [lomao] })
        }   
        if (e.errorCode == 'VOICE_MISSING_PERMS') {
            error(`Không thể tham gia voice vì thiếu perm \`VOICE_MISSING_PERMS\``)
            return
        }
        error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
    })
    client.distube.on('finishSong', queue => {
        function success(success) {
            const drac = new MessageEmbed()
                .setColor('YELLOW')
                .setDescription(`\`📛\` | ${success}`)
            queue.textChannel.send({ embeds: [drac] })
        }
        success(`Đã hêt bài \`${queue.songs[0].name}\` 😴`)
    })
    client.distube.on('empty', queue => {
        function success(success) {
            const drac = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`${success}`)
            queue.textChannel.send({ embeds: [drac] })
        }
        success(`Không còn ai trong voice channel, tui rời đây :D`)
    })
    //DisTubeOptions.searchSongs > 1
    client.distube.on('searchResult', (message, result) => {
        i = 0
        message.channel.send(
            `**Choose an option from below**\n${result
                .map(
                    song =>
                        `**${++i}**. ${song.name} - \`${song.formattedDuration
                        }\``,
                )
                .join(
                    '\n',
                )}\n*Enter anything else or wait 30 seconds to cancel*`,
        )
    })
    client.distube.on('searchCancel', message =>
        message.channel.send('Searching canceled'),
    )
    client.distube.on('searchInvalidAnswer', message =>
        message.channel.send('Invalid number of result.'),
    )
    client.distube.on('searchNoResult', message =>
        message.channel.send('Không có kết quả nào!'),
    )
}