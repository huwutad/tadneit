//require('dotenv').config();
//const client = require('../index')
//client.on('messageCreate', (message) => {
//    if (!(message.content.toLowerCase()).startsWith(process.env.PREFIX)) return
//    if (message.author.bot) return;
//    if (!message.guild) return;
//    const args = message.content
//        .slice(process.env.PREFIX.length)
//        .trim()
//        .split(/ +/g);
//      const cmd = args.shift().toLowerCase();
//      if (cmd.length == 0) return;
///      let commands = client.commands.get(cmd);
//      if (!commands) commands = client.commands.get(client.aliases.get(cmd));
//      if (commands) commands.run(client, message, args);
//  })