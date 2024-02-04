const { SlashCommandBuilder } = require('discord.js');
const { getHoistedOption } = require('../../helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-base-price')
		.setDescription('Sets base price')
		.addIntegerOption(option =>
			option.setName('price')
				.setDescription('base price')
				.setRequired(true)),
	async execute(interaction, auction) {
		console.log('aaaaaaaaaaa: ', interaction.options, auction);
		const price = getHoistedOption(interaction, 'price')

		auction.basePrice = price.value
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Base price set to ${auction.basePrice}`);
	},
};