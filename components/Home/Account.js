import React, { useContext, useState } from "react"
import { getMarketLeverage, formatMoney, getAccountEquity, getMarginUsage, toFixedIfNecessary, getTotalInitialMarginRequirement } from "../utilities"
import { DataContext } from './context'
import TextEditable from "./TextEditable"


const Account = () => {
	const { 
		fn:{setAccount},
		data:{account, currentMarket, positions}
	} = useContext(DataContext)

	const marketLeverage = getMarketLeverage(currentMarket)
	const accountEquity = getAccountEquity(positions, account.collateral)
	const marginUsage = getMarginUsage(positions, accountEquity)
	const freeCollateral = accountEquity - getTotalInitialMarginRequirement(positions)

	const handleEditCollateral = (value) => {
		setAccount(prev => {
			const copy = {...prev}
			copy['collateral'] = value
			return copy
		})
	}

	return (
		<div className="p-4 rounded-md text-white bg-color-dark w-full md:w-1/2">
			<h3 className="font-bold">
				<span>ACCOUNT</span> 
			</h3>
			<div className="flex justify-between">
				<div>Collateral (USDC)</div>
				<div>
					<TextEditable 
						value={account.collateral} 
						onChangeText={handleEditCollateral} 
					/>
				</div>
			</div>
			<div className="flex justify-between">
				<div>Equity</div>
				<div>{formatMoney(accountEquity)}</div>
			</div>
			{/* <div className="flex justify-between">
				<div>Buying Power</div>
				<div>{formatMoney(accountEquity * marketLeverage)}</div>
			</div> */}
			<div className="flex justify-between">
				<div>Free Collateral</div>
				<div>{formatMoney(freeCollateral)}</div>
			</div>
			<div className="flex justify-between">
				<div>Margin Usage</div>
				<div>{toFixedIfNecessary(marginUsage*100, 2)}%</div>
			</div>
			
		</div>
	)
}

export default Account