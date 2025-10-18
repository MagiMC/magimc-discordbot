require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.guilds] });
client.once("ready", () => {
    console.log("Ready");
});

client.login(process.env.DISCORD_TOKEN).then(() => {
    console.log("Logged in");
});
