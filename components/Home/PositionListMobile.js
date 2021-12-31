import React, { useContext } from "react"
import { getLiquidationPrice, getPnlAndRoe, getPositionLeverage, toFixedIfNecessary } from "../utilities"
import { DataContext } from './context'

const pos = {
	market: 'BTC-USD',
	side: 'LONG',
	size: 0.001,
	leverage: 2,
	orderPrice: 46800,
	liquidationPrice: 32000,
	oraclePrice: 48500,
	unrealizedPNL: -1000
}

const PositionItem = ({data, positions, accountCollateral, removePosition}) => {
	const {
		market,
		side,
		size,
		orderPrice,
		oraclePrice
	} = data

	const {pnl, roe} = getPnlAndRoe(size, oraclePrice, orderPrice)
	const leverage = getPositionLeverage(data, positions, accountCollateral)
	const liquidation = getLiquidationPrice(size, oraclePrice, positions, accountCollateral)

	return (
		<div className="row">
			<div>
				<span>{market} <br/> {side}</span>
			</div>
			<div>
				<span>{size} <br/> {toFixedIfNecessary(leverage, 2)}X</span>
			</div>
			<div>
				<span>{liquidation < 0 ? '-' : toFixedIfNecessary(liquidation, 4)} <br/> {oraclePrice}</span>
			</div>
			<div>
				<span className="cursor-pointer" onClick={() => removePosition(data.id)}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-5 w-5 inline-block -mt-1" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
					<br/> &nbsp;
				</span>
			</div>
		</div>
	)
}

const PositionList = () => {
	const { fn, data } = useContext(DataContext)
	const { positions, account } = data
	const { removePosition, removeAllPositions } = fn

	return (
		<div className="pt-4 text-white">
			<div className="flex justify-between items-center mb-4 px-1">
				<h3 className="font-bold">OPEN POSITIONS</h3>
				<button
					type="button"
					className="flex text-sm px-5 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
					onClick={removeAllPositions}
				>
					<span>Close All</span>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
				</button>
			</div>
			{
				positions.length < 1 ? 
				<div className="w-full color-alt text-center text-2xl py-8">No Positions Opened</div> : 
				(
					<div className="table-pos w-full text-center">
							<div className="row row-header color-alt">
								<div>
									<div>market</div> 
									<div>side</div>
								</div>
								<div>
									<div>size</div>
									<div>leverage</div>
								</div>
								<div>
									<div>liq price</div>
									<div>oracle</div>
								</div>
								<div>&nbsp;</div>
							</div>
						{
							positions.map(
								position => 
									<PositionItem 
										key={position.id} 
										data={position} 
										positions={positions}
										accountCollateral={account.collateral}
										removePosition={removePosition} 
									/>)
						}
					</div>
				)
			}
			
			
		</div>
	)
}

export default PositionList