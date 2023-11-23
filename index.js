const { ShardingManager } = require('discord.js');
require('dotenv').config()

const manager = new ShardingManager('./bot.js', { 
    token: process.env.TOKEN, 
    totalShards: "auto", 
    respawn: true, 
    spawnTimeout: -1,
});

manager.on('shardCreate', shard => console.log(`start shard #${shard.id}`));

manager.spawn(manager.totalShards, 1000, -1).catch(e => console.log(e));