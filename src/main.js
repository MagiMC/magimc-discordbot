require("dotenv").config();
const { Client, Events, GatewayIntentBits, ActivityType } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    client.user.setActivity('MagiMC', { type: ActivityType.Playing });
});

client.login(process.env.DISCORD_TOKEN).then(() => {
    console.log("Logged in");
});
