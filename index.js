const { Client, Intents, MessageEmbed, Collection } = require('discord.js');
const Distube = require('distube')
const {SoundCloudPlugin} = require('@distube/soundcloud')
const {SpotifyPlugin} = require('@distube/spotify')
require('dotenv').config();

const client = new Client({
  intents: 32767
});
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.interaction = new Collection();
client.slashCommands = new Collection();

['loadEvents.js', 'loadSlashCommands.js'].forEach(handler => { //'loadCommands.js'
  require(`./handlers/${handler}`)(client);
})

client.distube = new Distube.default(client, {
	searchSongs: 5,
	searchCooldown: 30,
	leaveOnEmpty: true,
	emptyCooldown: 20,
	leaveOnFinish: false,
	leaveOnStop: false,
	plugins: [new SoundCloudPlugin(), new SpotifyPlugin()],
});
require('./Events/Distube')(client);

client.login(process.env.TOKEN)