const { MessageEmbed, Channel } = require("discord.js")
const { createCanvas, loadImage } = require('canvas')
const fetch = require("node-fetch")


module.exports = {
    name: "info",
    description: "genshin",
    options: [
        {
            name: 'uid',
            description: 'uid cua ban',
            type: 'STRING',
            required: true,
        }
    ],
    run: async (client, interaction) => {
        const canvas = createCanvas(200, 200)
        const ctx = canvas.getContext('2d')

        ctx.font = '30px Impact'
        ctx.rotate(0.1)
        ctx.fillText('ILv', 50, 100)

        var text = ctx.measureText('ILV')
        ctx.strokeStyle = 'rgba(0,0,0,0.5)'
        ctx.beginPath()
        ctx.lineTo(50, 102)
        ctx.lineTo(50 + text.width, 102)
        ctx.stroke()

        await loadImage(`./hutao.jpg`).then((image) => {
            ctx.drawImage(image, 50, 0, 70, 70)
        })
        let uid = interaction.options.getString('uid')
        await interaction.deferReply()
        fetch(`https://enka.network/u/${uid}/__data.json`)
            .then(async res => {
                const data = await res.json()
                const embed = new MessageEmbed()
                    .setTitle('mmmm')
                    //.setImage(ctx)
                    .setImage(canvas.toBuffer())
                // await interaction.editReply({ embeds: embed , files: [{
                //     attachment: canvas.toBuffer()
                // }]})
                // console.log('<img src="' + canvas.toBuffer() + '" />')
                //console.log(data.avatarInfoList[0].equipList[0])
                console.log(data)
            })

    }
}