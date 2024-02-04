const { SlashCommandBuilder } = require('discord.js');
const { getHoistedOption } = require('../../helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('generate-draft-order')
		.setDescription('Randomly generates draft order')
		.addStringOption(option =>
			option.setName('teams')
				.setDescription('Item name to be added')
				.setRequired(true)),
	async execute(interaction, auction) {
		console.log('aaaaaaaaaaa: ', interaction.options, auction);
		const teams = getHoistedOption(interaction, 'teams')

		let teamList = teams.value.split(',')
		const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());
		const newList = shuffleArray(teamList);
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		let draftOrder = '**Draft Order: **'
		for (const key in newList) {
			draftOrder += `\n${+key+1}: ***${newList[key]}***` 
		}
		await interaction.reply({
			content: draftOrder
		});
	},
};