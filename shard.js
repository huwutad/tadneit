const { ShardingManager } = require('discord.js');
require('dotenv').config()
const host = require('./host');
host()
let manager = new ShardingManager('./index.js', {
  token: process.env.token,
  totalShards: 10,
});

manager.on('shardCreate', async (shard) => {
  console.log(`[SHARD] Shard ${shard.id} connected to Discord's Gateway.`)
  shard.on('error', (error) => {
      console.error(error)
  })
});

manager.spawn()