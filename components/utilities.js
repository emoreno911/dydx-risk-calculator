export const formatNumber = (number) => {
	return new Intl.NumberFormat().format(number)
}

export const formatMoney = (amount) => {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export const toNumber = (num) => {
	return num * 1
}

export const toFixedIfNecessary = ( value, dp ) => {
  return +parseFloat(value).toFixed( dp );
}

export const getMarketLeverage = (market) => {
	const isBTC = market.indexOf('BTC') !== -1 
	const isETH = market.indexOf('ETH') !== -1 

	return isBTC || isETH ? 25 : 10
}

export const getLiquidationPrice = (size, oraclePrice, positions, accountCollateral) => {
	const accountEquity = getAccountEquity(positions, accountCollateral)
	const W = getTotalMaintenanceMarginRequirement(positions)
	const liquidationPrice = ((size*oraclePrice) + W - accountEquity)/size 
	return liquidationPrice
}

// Calculations and formulas
export const getAccountEquity = (positions, accountCollateral) => {
	const profit = positions.reduce((accum, el) => {
		const rest = (el.size * el.oraclePrice) - (el.size * el.orderPrice)
		return accum + rest
	}, 0)
	
	return accountCollateral + profit
}

export const getPositionLeverage = (position, positions, accountCollateral) => {
	const { size, oraclePrice } = position
	const accountEquity = getAccountEquity(positions, accountCollateral)
	return Math.abs(size * oraclePrice / accountEquity)
}

export const getMarginUsage = (positions, accountEquity) => {
	const sumatoria = positions.reduce((accum, el) => {
		const initialMarginRequirement = getInitialMarginRequirement(el)
		return accum + initialMarginRequirement
	}, 0)

	return sumatoria/accountEquity
}

export const getPnlAndRoe = (size, oraclePrice, orderPrice) => {
	const _pnl = size * (oraclePrice - orderPrice)
	const roe = (size*orderPrice) !== 0 ? toFixedIfNecessary(_pnl*100/(size*orderPrice), 2) : 0
	const pnl = (size*orderPrice) !== 0 ? toFixedIfNecessary(_pnl, 2) : 0

	return {pnl, roe}
}

export const getMaintenanceMarginRequirement = (position) => {
	const { size, oraclePrice, maintenanceMarginFraction } = position
	return Math.abs(size * oraclePrice * maintenanceMarginFraction)
}

export const getInitialMarginRequirement = (position) => {
	const { size, oraclePrice, initialMarginFraction } = position
	return Math.abs(size * oraclePrice * initialMarginFraction)
}

export const getTotalMaintenanceMarginRequirement = (positions) => {
	return positions.reduce((accum, el) => accum + Math.abs(el.size * el.oraclePrice * el.maintenanceMarginFraction), 0)
}

export const getTotalInitialMarginRequirement = (positions) => {
	return positions.reduce((accum, el) => accum + Math.abs(el.size * el.oraclePrice * el.initialMarginFraction), 0)
}

export const getTotalAccountValue = (positions, usdcBalance) => {
	const sum = positions.reduce((accum, el) => accum + Math.abs(el.size * el.oraclePrice), 0)
	return usdcBalance + sum
}

/**
 * 
 * Q is the account's USDC balance (note that Q may be negative)
 * S is the size of the position (positive if long, negative if short)
 * P is the oracle price for the market
 * I is the initial margin fraction for the market
 * M is the maintenance margin fraction for the market
 * 
 * Initial Margin Requirement = abs(S × P × I) 
 * Maintenance Margin Requirement = abs(S × P × M)
 * 
 * The margin requirement for the account as a whole
 * Total Initial Margin Requirement = Σ abs(Si × Pi × Ii) 
 * Total Maintenance Margin Requirement = Σ abs(Si × Pi × Mi)
 * 
 * Total Account Value = Q + Σ (Si × Pi)
 * 
 */