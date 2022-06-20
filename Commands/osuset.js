const { MessageEmbed } = require('discord.js');
require('dotenv').config
const name  = 'osuset'

module.exports = {
    name: 'osuset',
    category: 'Osu',
    description: 'Set tên osu! của bạn! 🎶',
    options: [
        {
            name: 'name',
            description: 'Tên của bạn trên osu! Bancho server',
            type: 'STRING',
            required: true,
        }
    ],
    run: async (client, interaction, db) => {
        const name = interaction.options.getString('name')
        const id = interaction.user.id
        let dbo = db.db("osu");
        let obj = { name: name, _id: id};
        //dbo.collection("user").find({}, { projection: { _id: id } }).toArray(function(err, result) {
            //if (err) throw err;
            //console.log(result);
          //});xs
          dbo.collection("user").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("đã update");
          });
        dbo.collection("user").insertOne(obj , (err , result)=>{
            if(err) throw err;
            // console.log("Thêm thành công");
            // console.log(result);
            db.close();
            });
        interaction.reply({content: `**${interaction.user.username}, tên của bạn trên server \`Bancho\` đã được set là: \`_hUwUtao_\`**`})
    }
}