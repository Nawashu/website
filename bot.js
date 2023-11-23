const { Client, GatewayIntentBits, Options } = require('discord.js');
require("dotenv").config()
const mysql = require('mysql');
const { AutoPoster } = require('topgg-autoposter');

const client = new Client({
	//cache
	makeCache: Options.cacheWithLimits({
		...Options.DefaultMakeCacheSettings,
		ReactionManager: 0,
		GuildMemberManager: {
			maxSize: 1,
			keepOverLimit: member => member.id === client.user.id,
		},
	}),

	//Balayage
	sweepers: {
		...Options.DefaultSweeperSettings,
		messages: {
			interval: 10, // Every hour...
			lifetime: 10,	// Remove messages older than 30 minutes.
		},
		users: {
			interval: 10, // Every hour...
			filter: () => user => user.bot && user.id !== client.user.id, // Remove all bots.
		},
	},

	intents: [
		GatewayIntentBits.AutoModerationConfiguration,
		GatewayIntentBits.AutoModerationExecution,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent
	],
});

//database connection
const con = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DBUSER,
    password: process.env.MDP,
    database: process.env.NAME,
    stream: true
});

con.connect(function(err) {
	if(err) return console.log(err);
	console.log('database connected');
})

client.on('ready', async (client) => {

	setTimeout(function() {

		//web
		const webPortal = require('./server');
		webPortal.load(client, con);
		//Top.gg Data
		const autoData = AutoPoster(process.env.GG_TOKEN, client, { interval: 3600000 })
		autoData.on('posted', () => {})
	
	}, 420000) //7min

})

//login
client.login(process.env.TOKEN)