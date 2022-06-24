const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const name = 'help'

module.exports = {
    name: "help",
    description: 'Xem tất cả các command của bot! 📝',
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true })
        if (!interaction.isCommand()) return;
        if (interaction.commandName === 'help') {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('select')
                        .setPlaceholder('Lệnh Help')
                        .addOptions([
                            {
                                label: 'Lệnh tiện ích ( Utilities )',
                                description: 'Các lệnh về tiện ích',
                                value: 'first_option',
                            },
                            {
                                label: 'Lệnh âm nhạc ( Music )',
                                description: 'Các lệnh về âm nhạc',
                                value: 'second_option',
                            },
                            {
                                label: 'Lệnh Osu! ( Osu! )',
                                description: 'Các lệnh về osu!',
                                value: 'third_option',
                            }
                        ]),
                );
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Bảng Help!')
                .setDescription('Prefix: [/] (SlashCommand), \n Có thể dùng \`/about\` để biết nhiều về bot hơn ✨! ');
            await interaction.editReply({ ephemeral: true, embeds: [embed], components: [row] });
        };
        //var cmd = new String()
        //var helpembed = new MessageEmbed()
        //var i = new Boolean(false)
        //var count = 0;
        //readdirSync('./Commands/').forEach(dir => {
        //const commands = readdirSync(`./Commands/`).filter(file => file.endsWith('.js'));
        //for (let file of commands) {
        //let pull =  require(`../${file}`) 
        client.on('interactionCreate', async interaction => {
            if (!interaction.isSelectMenu()) return;
            if (interaction.values[0] == 'first_option') {
                const embed = new MessageEmbed()
                    .setTitle('Lệnh tiện ích ( Utilities )')
                    .addFields(
                        {
                            name: `**Avatar:**`,
                            value: '> Xem avatar của người khác! 📷',
                        },
                        {
                            name: `**Ping:**`,
                            value: '> Xem tôi có lag không! 🏓',
                        },
                        {
                            name: `**Whois:**`,
                            value: '> Xem thông tin của ai đó! 📨',
                        }
                    )
                interaction.reply({ embeds: [embed], ephemeral: true })
            }
            if (interaction.values[0] == 'second_option') {
                const embed = new MessageEmbed()
                    .setTitle('Lệnh âm nhạc ( Music )')
                    .addFields(
                        {
                            name: `**Autoplay:**`,
                            value: '> Tự động phát nhạc tiếp theo mà không cần chọn nhạc! 💨',
                        },
                        {
                            name: `**Play:**`,
                            value: '> Tìm kiếm nhạc bạn muốn nghe! 🎶',
                        },
                        {
                            name: `**Pause:**`,
                            value: '> Dừng nhạc đang chạy! 📛',
                        },
                        {
                            name: `**Queue:**`,
                            value: '> Xem nhạc trong hàng chờ! 🏁',
                        },
                        {
                            name: `**Resume:**`,
                            value: '> Tiếp tục nhạc hiện tại! ▶'
                        },
                        {
                            name: `**Skip:**`,
                            value: '> Bỏ qua bài nhạc hiện tại! ⏩'
                        },
                        {
                            name: `**Stop:**`,
                            value: `> Dừng lại bài nhạc đang phát! ⛔`
                        },
                    )
                embed.addField(`**Volume**`, `> Chỉnh âm thanh của bài nhạc! 🔊'`)
                interaction.reply({ embeds: [embed], ephemeral: true })
            }
            if (interaction.values[0] == 'third_option') {
                const embed = new MessageEmbed()
                    .setTitle('Lệnh Osu! ( Osu! )')
                    .addFields(
                        {
                            name: `**Osu**`,
                            value: '> Tìm thông tin của bạn trên osu! 🎶',
                        },
                        {
                            name: `**OsuSet:**`,
                            value: '> Set tên osu! của bạn vào database! 🎶',
                        },
                        {
                            name: `**OsuTop:**`,
                            value: '> Xem top các score của bạn trên osu! 🎶',
                        },
                        {
                            name: `**Recent:**`,
                            value: '> Xem score osu! của bạn gần nhất! 🎶',
                        },
                    )
                interaction.reply({ embeds: [embed], ephemeral: true })
            }

        })
        // }
        //})
    }
}