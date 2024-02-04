const { SlashCommandBuilder } = require('discord.js');
const { getHoistedOption } = require('../../helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bid')
		.setDescription('Gets auction item to add in queue in quotes i.e. "Babar Azam".')
		.addIntegerOption(option =>
			option.setName('increase-by')
				.setDescription('Item name to be added')
				.setRequired(false)),
	async execute(interaction, auction) {
		console.log('aaaaaaaaaaa: ', interaction.options, auction);
		const increaseBy = getHoistedOption(interaction, 'increase-by')
		if(auction.bidLeader == interaction.user.username) {
			await interaction.reply('you are already the highest bidder')	
			return
		} else {
			auction.bidLeader = interaction.user.username;
			if(!auction.lastBid){
				auction.lastBid = auction.basePrice
			} else if((increaseBy?.value || -1) > auction.minBidIncreament) {
				auction.lastBid = auction.lastBid + increaseBy?.value || 0;
			} else {
				auction.lastBid = auction.lastBid + auction.minBidIncreament;
			}
		}
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`${auction.activeItem}\nbid increased to ${auction.lastBid}\nhighest bid by ${interaction.user.username}`);
	},
};