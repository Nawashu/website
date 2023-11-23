const express = require('express');
const ejs = require('ejs');
const path = require('path');

require('dotenv').config();
const app = express();
const port = 25563;

module.exports.load = async (client, con) => {

    if(client.shard.ids[0] != 0) return;

    //website
    app.engine('html', ejs.renderFile)
    app.set('view engine', 'ejs');
    
    app.set('views', path.join(__dirname, 'website/views'));
    app.use(express.static(path.join(__dirname, 'website/public')));
    
    let guilds = 0;
    let users = 0;
    
    let guildsTop = [];
    let finalsGuilds = [];
    
    //users
    await client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
    .then((shardMembersSize) => {
        for (const size of shardMembersSize) users = users + size;
    });

    //guilds TOP
    await client.shard.fetchClientValues('guilds.cache')
    .then((shards) => {
        for(const guilds of shards) {
            for(const guild of guilds) {
                if(guild) {
                    guildsTop.push({
                        guild: guild,
                        members: guild.memberCount,
                        guildId: guild.id
                    })
                }
            }
        }
    });

    guildsTop.sort((a, b) => {
        return a.members - b.members
    }).reverse()

    //finalsGuilds
    for(let i = 0; i < 15; i++) {
        let guild = guildsTop[i].guild;
        if(!guild.icon || ['972938210244165682', '799581681957732383', '374071874222686211'].includes(guild.id)) {}
        else {
            finalsGuilds.push(guildsTop[i])
        }
    }

    //guilds
    await client.shard.fetchClientValues('guilds.cache.size')
    .then((shardGuildsSize) => {
        for (const size of shardGuildsSize) guilds = guilds + size;
    });

    await con.query(`SELECT * FROM MEDIAS WHERE STATUS = 1`, (err, rows) => {

        console.log(rows.length)

        app.get('/', async function(req, res) {
    
            req.socket.setTimeout(10 * 60 * 1000);
        
            res.render('index', {
                bot: client,
                users: Math.floor(users / 1000),
                guilds: Math.floor(guilds / 1000),
                images: rows.length,
                guildsTop: finalsGuilds || null
            });

        })
    
        app.listen(port, () => {
            console.log(`Website listen on :${port}`);
        })

    })

}