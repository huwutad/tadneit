const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const name = 'invite'

module.exports = {
    name: 'invite',
    description: 'Mời bot vào máy chủ khác 🪀',
    run: async (client, interaction) => {
        await interaction.deferReply();
        console.log(`[USED] ${interaction.user.username} đã sử dụng ${name}`)
        function error(error) {
            const lomao = new MessageEmbed()
                .setColor('RED')
                .setDescription(`\`❌\` | ${error}`)
            interaction.reply({ embeds: [lomao], ephemeral: true })
        }
        try {
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setAuthor({ name: "Invite!" })
                .setDescription("```Invite tôi vào server của bạn🥰!```")
                .setTimestamp()
            //.setFooter({ text: `Được yêu cầu bởi: ${interaction.author.tag}`, iconURL: interaction.author.displayAvatarURL()});
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("Invite")
                        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1374724151558&scope=bot%20applications.commands`)
                        .setEmoji("🔗")
                        .setStyle("LINK")
                )

            await interaction.editReply({ embeds: [embed], components: [row] });
        } catch (e) {
            console.error(e)
            console.log(e)
            error(`Đã xảy ra lỗi: ${e} \n Báo <@!${process.env.OWNER}> để được fix, cảm ơn ${process.env.LOVE}`)
        }
    }
}