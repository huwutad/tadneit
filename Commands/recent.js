const { MessageEmbed } = require('discord.js');
require('dotenv').config
const name  = 'recent'

module.exports = {
    name: 'recnet',
    category: 'Osu',
    description: 'Xem score osu! của bạn gần nhất!',
    options: [
        {
            name: 'name',
            description: 'Tên của bạn trên osu! Bancho server',
            type: 'STRING',
            required: true,
        }
    ],
    run: async (client, interaction) => {
        
     }
}