const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = async (client) => {
    const status = queue =>
    `Âm lượng: \`${queue.volume}%\` | Filter: \`${
        queue.filters.join(', ') || 'Tắt❌'
    }\` | Lặp lại: \`${
        queue.repeatMode
            ? queue.repeatMode === 2
                ? 'Tất cả bài nhạc!'
                : 'Một bài nhạc!'
            : 'Tắt❌'
    }\` | Tự động phát: \`${queue.autoplay ? 'Bật✅' : 'Tắt❌'}\``
        async function error(error) {
          const lomao2 = new MessageEmbed()
          .setColor('RED')
          .setDescription(`\`❌\` | ${error}`)
          const ẻrỏ = await interaction.followUp({embeds: [lomao2], ephemeral: true, allowedMentions: {repliedUser: false}})
          setTimeout(() => {
            ẻrỏ.delete()
            }, 5000)
        }
        
        async function success(success) {
          const thanhcong2 = new MessageEmbed()
          .setColor('GREEN')
          .setDescription(`\`✅\` | ${success}`)
          const tc =  await interaction.followUp({embeds: [thanhcong2], ephemeral: true, allowedMentions: {repliedUser: false}})
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
            .addField('Lượt xem 👀:', `\`${song.views}\``,true)
            .addField('Lượt thích 👍:', `\`${song.likes}\``,true)
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
const huylmao = await queue.textChannel.send({embeds: [play], components: [row], allowedMentions: {repliedUser: false}})

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
        .addField('Lượt xem 👀:', `\`${song.views}\``,true)
        .addField('Lượt thích 👍:', `\`${song.likes}\``,true)
        .addField(`Được yêu cầu bởi 💡:`, `${song.user} ✅`)
        .setTimestamp()
        huylmao.edit({embeds: [play2], components: [row], allowedMentions: {repliedUser: false}})
        huylomao();
    }, 5000);
}
    huylomao()
    })
    client.distube.on('addSong', (queue, song) => {
        function success(success) {
            const drac = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`\`✅\` | ${success}`)
            queue.textChannel.send({embeds: [drac], allowedMentions: {repliedUser: false}})
        }
        success(`Đã thêm **${song.name}** - \`${song.formattedDuration}\` vào hàng chờ bởi ${song.user}`,)
    })
    client.distube.on('addList', (queue, playlist) => {
        if (String(e).search('Error [PlayError]')) return error(` Không tìm thấy danh sách phát đó!`)
        function success(success) {
            const drac = new MessageEmbed()
            .setColor('RED')
            .setDescription(`\`✅\` | ${success}`)
            queue.textChannel.send({embeds: [drac], allowedMentions: {repliedUser: false}})
        }
        success(`Đã thêm danh sách phát **${playlist.name}** (${playlist.songs.length} bài hát) vào hàng chờ \n${status(queue)}`,)
    })
    client.distube.on('error', (textChannel, e) => {
        console.error(e)
        function error(error) {
            const lomao = new MessageEmbed()
            .setColor('RED')
            .setDescription(`\`❌\` | ${error}`)
            .setFooter(`> Báo cho hUwUtao#8701 với ;-;`)
            queue.textChannel.send({embeds: [lomao], allowedMentions: {repliedUser: false}})
            if (e.errorCode == 'VOICE_MISSING_PERMS') {
                error(` Không thể vào voice channel vì thiếu \`VOICE_PERMS\``) 
            }
        }
        error(`Đã xảy ra lỗi: ${e.message.slice(0, 2000)}`,)
    })
    client.distube.on('finishSong', queue => {
        function success(success) {
            const drac = new MessageEmbed()
            .setColor('YELLOW')
            .setDescription(`\`📛\` | ${success}`)
            queue.textChannel.send({embeds: [drac], allowedMentions: {repliedUser: false}})
        }
        success(`Đã hêt bài \`${queue.songs[0].name}\` 😴`)
    })
    client.distube.on('empty', queue => {
        function success(success) {
            const drac = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`${success}`)
            queue.textChannel.send({embeds: [drac], allowedMentions: {repliedUser: false}})
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
                        `**${++i}**. ${song.name} - \`${
                            song.formattedDuration
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