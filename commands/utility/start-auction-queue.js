const { SlashCommandBuilder } = require('discord.js');
const { getHoistedOption } = require('../../helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start-auction-queue')
		.setDescription('Starts Auction Queue'),
	async execute(interaction, auction) {
		console.log('aaaaaaaaaaa: ', interaction.options, auction);
		const itemName = getHoistedOption(interaction, 'item-name')

		auction.activeItem = auction.auctionItems.find(x=>x)
		auction.lastBid = 0
		if(!auction.basePrice) {
			await interaction.reply(`Base Price is not set`);
			return
		}
		if(!auction.activeItem) {
			await interaction.reply(`Auction Ended`);
			return
		}
		await interaction.reply(`Auction Started\nSelling ${auction.activeItem} at ${auction.basePrice}`);
		return
		
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		
	},
};