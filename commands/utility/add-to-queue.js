const { SlashCommandBuilder } = require('discord.js');
const { getHoistedOption } = require('../../helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-to-queue')
		.setDescription('Gets auction item to add in queue in quotes i.e. "Babar Azam".')
		.addStringOption(option =>
			option.setName('item-name')
				.setDescription('Item name to be added')
				.setRequired(true)),
	async execute(interaction, auction) {
		console.log('aaaaaaaaaaa: ', interaction.options, auction);
		const itemName = getHoistedOption(interaction, 'item-name')

		auction.auctionItems.push(itemName.value)
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Added to the queue\nQueue: ${auction.auctionItems}`);
	},
};