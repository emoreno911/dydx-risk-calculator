import React, { useContext } from "react"
import { DataContext } from './context'
import { 
	toNumber,
	formatMoney,
	getPnlAndRoe,
	getMarketLeverage,  
	getPositionLeverage, 
	toFixedIfNecessary, 
	getLiquidationPrice
} from "../utilities"

const PositionResume = () => {
	const { fn, data } = useContext(DataContext)
	const {
		side,
		amount,
		orderPrice,
		oraclePrice,
		markets, 
		account,
		currentMarket,
		positions
	} = data

	const marketLeverage = getMarketLeverage(currentMarket)
	const {pnl, roe} = getPnlAndRoe(amount, oraclePrice, orderPrice)

	let liquidationPrice = 0 
	let positionLeverage = 0
	
	if (markets !== null) {
		const size = side === 'LONG' ? toNumber(amount) : toNumber(amount) * -1
		const position = {
			side,
			orderPrice,
			oraclePrice,
			currentMarket,
			size,
			initialMarginFraction: markets[currentMarket]['initialMarginFraction'],
			maintenanceMarginFraction: markets[currentMarket]['maintenanceMarginFraction']
		}

		// setting orderPrice as oraclePrice because we're evaluating the scenario
		positionLeverage = getPositionLeverage(
			{
				size,
				oraclePrice
			}, 
			[position, ...positions], 
			account.collateral
		)

		liquidationPrice = getLiquidationPrice(size, oraclePrice, [position, ...positions], account.collateral)
	}

	return (
		<div className="p-4 rounded-md text-white bg-color-dark w-full md:w-1/2 mr-2">
			<h3 className="font-bold">POSITION</h3>
			<div className="flex justify-between">
				<div>{side}</div>
				<div>{amount} {currentMarket.split('-')[0]}</div>
			</div>
			<div className="flex justify-between">
				<div>Leverage</div>
				<div className={positionLeverage > marketLeverage ? 'text-red-500' : ''}>
					{toFixedIfNecessary(positionLeverage, 2)}X
				</div>
			</div>
			<div className="flex justify-between">
				<div>Liquidation Price</div>
				<div>
					{
						liquidationPrice < 0 ? '-' : formatMoney(toFixedIfNecessary(liquidationPrice, 4))
					}
				</div>
			</div>
			<div className="flex justify-between">
				<div>Unrealized PNL</div>
				<div>{pnl} USD ({roe}%)</div>
			</div>
		</div>
	)
}

export default PositionResume