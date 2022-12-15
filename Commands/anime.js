const { MessageEmbed, Channel } = require("discord.js")
const { get } = require('request-promise-native');
const translate = require('@iamtraction/google-translate');

module.exports = {
    name: "anime",
    description: "Tìm bộ anime mà bạn mong muốn! 🔍",
    options: [
        {
            name: 'name',
            description: 'Tên anime của bạn muốn tìm',
            type: 'STRING',
            required: true,
        }
    ],
    run: async (client, interaction) => {
        let id = interaction.options.getString('name');
        let option = {
            url: `https://kitsu.io/api/edge/anime?filter[text]=${id}`,
            method: `GET`,
            headers: {
                'Conent-Type': "application/vnd.api+json",
                'Accept': "application/vnd.api+json",
            },
            json: true
        }
        //console.log(option)
        //const query = 'Xin Chào'
        // const translated = await translate(query, { to: 'en'});
        // console.log(translated);
        get(option).then(async anime => {
            await interaction.deferReply()
            // tình trạng của phim
            if (anime.data[0].attributes.status == 'finished') anime.data[0].attributes.status = `Đã hoàn thành`
            if (anime.data[0].attributes.status == 'current') anime.data[0].attributes.status = `Chưa hoàn thành`
            const desAnime = anime.data[0].attributes.synopsis
            const translated = await translate(desAnime, { to: 'vi' });
            //console.log(translated);
            const animu = new MessageEmbed()
                .setTitle(anime.data[0].attributes.titles.en_jp)
                .setURL(`https://kitsu.io/${anime.data[0].id}`)
                .setDescription(translated.text)
                .setThumbnail(anime.data[0].attributes.posterImage.original)
                .addField('Tình trạng 🔔:', anime.data[0].attributes.status, true)
                .addField('Xếp hạng trung bình ⭐:', `${anime.data[0].attributes.averageRating}/100`, true)
                .addField('Xếp hạng 🏆:', `${anime.data[0].attributes.ratingRank}`, true)
                .addField('Được phát hành 📅:', `${anime.data[0].attributes.startDate} to ${anime.data[0].attributes.endDate || "N/A"}`, true)
                .addField('Tổng số tập 🎬:', `${anime.data[0].attributes.episodeCount}` || "?", true)
                .addField('Thời gian ⏱:', `${anime.data[0].attributes.episodeLength}`, true)
            await interaction.editReply({ embeds: [animu] })
            //console.log(anime.data[0].attributes.ratingRank)
        }).catch(async e => {
            console.log(e)
            await interaction.editReply(`drac`)
            return
        })
    }
}