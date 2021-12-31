import { Connection, PublicKey } from '@solana/web3.js'
import { Market } from '@project-serum/serum'

let validator = 'https://solana-api.projectserum.com'	//'https://vip-api.mainnet-beta.solana.com'
let connection = new Connection(validator)
let programId = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin') // Serum program v3

export async function getOrderbook(marketId, index, depth = 1) {
	let marketAddress = new PublicKey(marketId);
	let market = await Market.load(connection, marketAddress, {}, programId);

	// Fetching orderbooks
	let bids = await market.loadBids(connection);
	let asks = await market.loadAsks(connection);

	return {
		marketId,
		asks: asks.getL2(depth), // sell
		bids: bids.getL2(depth)  // buy
	}
}