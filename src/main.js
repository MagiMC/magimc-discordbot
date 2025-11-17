require("dotenv").config();
const {
    Client,
    Events,
    GatewayIntentBits,
    ActivityType,
    Collection
} = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands");
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    client.user.setActivity("MagiMC", { type: ActivityType.Playing });
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({
            content: "Errore eseguendo il comando.",
            ephemeral: true,
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
