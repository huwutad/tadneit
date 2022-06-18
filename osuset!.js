const { MessageEmbed } = require('discord.js');
require('dotenv').config
const name  = 'osu!set'

module.exports = {
    name: 'osu!set',
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
    run: async (client, interaction) => {
        
     }
}