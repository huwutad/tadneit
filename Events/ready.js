require('dotenv').config();
module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const activities_list = [
			'.',
				`${client.guilds.cache.size} servers  `,
				//`Nếu tui có lỗi thì kêu ông hUwUtao#8701 nhé! 🐛| ${config.prefix}help`,
				//`Tui đang nằm trong ${client.guilds.cache.size} server ✨ | ${config.prefix}help`
			]
		  client.user.setStatus('online')
		  setInterval(() => {
				const index = Math.floor(Math.random() * (activities_list.length - 1) + 1)
				client.user.setActivity(activities_list[index], { type: 'WATCHING' });
			}, 10000);
            console.log(`[READY]: ${client.user.tag} đã online!`)
	},
};