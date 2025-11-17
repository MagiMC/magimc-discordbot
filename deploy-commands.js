require("dotenv").config();
const fs = require("fs");
const { REST, Routes } = require("discord.js");

const commands = [];

const commandFiles = fs.readdirSync("./commands");
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
         { body: commands }
)
.then(() => console.log("Slash commands registered"))
.catch(console.error);
