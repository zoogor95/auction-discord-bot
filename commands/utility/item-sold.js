const { SlashCommandBuilder } = require('discord.js');
const { getHoistedOption } = require('../../helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('item-sold')
		.setDescription('Gets auction item to add in queue in quotes i.e. "Babar Azam".'),
	async execute(interaction, auction) {
		if(auction.bidLeader) {
			await interaction.reply(`${auction.activeItem} is sold to ${auction.bidLeader} for ${auction.lastBid}`)	
		} else {
            await interaction.reply(`${auction.activeItem} is gone unsold due to no bids`)	
        }
        auction.userDetails[auction.bidLeader] = {
            balance: auction.userDetails[interaction.user.username].balance - auction.lastbid,
            owned: [...auction.userDetails[auction.bidLeader].owned, { item: auction.activeItem, boughtFor: auction.lastbid }],
        }; 
        auction.lastBid = 0;
        auction.bidLeader = null;  
        auction.activeItem = null;  
        auction.auctionItems.shift();  
        return

	},
};