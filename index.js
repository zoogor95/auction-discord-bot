const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
// Log in to Discord with your client's token
client.login(token);

client.commands = [];
client.executables = {};
client.auction = {
  auctionItems: [],
  minBidIncreament: 1,
  bidLeader: null,
  userDetails: {},
  lastBid: 0,
  basePrice: 1,
};


for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.push(command.data);
			client.executables[command.data.name] = command.execute;
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
///add-to-queue "Babar Azam"
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	if (!interaction.commandName) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
  
	try {
    if(typeof client.executables?.[interaction?.commandName] == 'function') {
      await client.executables[interaction.commandName](interaction, client.auction);
    }
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});




// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${client.commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: client.commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
