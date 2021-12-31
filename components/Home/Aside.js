import React, { useContext } from "react"
import dynamic from 'next/dynamic'
import numeral from 'numeral'
import { DataContext } from './context'
import { 
	getPositionLeverage,
	getMarketLeverage, 
	formatMoney,
	toNumber 
} from "../utilities"

const DynamicModalMarkets = dynamic(
  () => import('./ModalMarkets'),
  { ssr: false }
)

const CustomInput = ({name, label, placeholder, unit, value, onChange}) => {
	return (
		<div className="mb-2">
			<label className="block text-white">{label}</label>
			<div className="flex flex-wrap items-stretch w-full mt-1 relative">
				<input 
					type="number" 
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={evt => onChange(evt.currentTarget.value)}
					className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 h-10 rounded-lg rounded-r-none px-3 relative bg-color-dark text-white font-bold" 
				/>
				<div className="flex">
					<button className="flex items-center leading-normal rounded-l-none px-3 whitespace-no-wrap text-sm w-16 h-10 justify-center items-center text-md font-bold rounded-lg bg-color-alt text-gray-100">
						{unit}
					</button>
				</div>
			</div>
		</div>
	)
}

const WarningButton = ({ message }) => (
	<button 
		type="button"
		className="w-full text-md px-5 py-2 mb-4 bg-color-alt text-gray-400 rounded-md rounded-t-none focus:outline-none flex justify-center items-center"
	>
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
		<span>{ message }</span>
	</button>
)

const Aside = () => {
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

	const {
		setSide,
		setAmount,
		addPosition,
		setPositions,
		setOrderPrice,
		setOraclePrice,
		setCurrentMarket,
	} = fn

	// Leverage Limit
	const positionLeverage = getPositionLeverage({size:amount, oraclePrice}, positions, account.collateral)
	const marketLeverage = getMarketLeverage(currentMarket)
	const leverageWarning = positionLeverage > marketLeverage ? "Leverage limit exeded" : null

	// Min Position Size
	const positionMinSize = markets !== null ? toNumber(markets[currentMarket]['minOrderSize']) : 0
	const positionSizeWarning = amount < positionMinSize ? "Position size bellow minimum" : null

	const sizeButtonBase = "w-full text-white text-md px-5 py-2 border-2 rounded-md focus:outline-none"
	const longButtonSelected = side === 'LONG' ? "bg-green-500 font-bold" : ""
	const shortButtonSelected = side !== 'LONG' ? "bg-red-500 font-bold" : ""

	const handleAddPosition = () => {

		const id = `${currentMarket}-${Date.now()}`

		const position = {
			id,
			market: currentMarket,
			side,
			size: side === 'LONG' ? toNumber(amount) : toNumber(amount) * -1,
			orderPrice: toNumber(orderPrice),
			oraclePrice: toNumber(oraclePrice),
			maintenanceMarginFraction: toNumber(markets[currentMarket]['maintenanceMarginFraction']),
			initialMarginFraction: toNumber(markets[currentMarket]['initialMarginFraction'])
		}

		addPosition(position)
	}

	return (
		<div className="h-full px-2 py-4">
			<DynamicModalMarkets 
				markets={markets} 
				currentMarket={currentMarket}
				setMarket={setCurrentMarket}
			/>
			<div className="flex mt-2">
				<button 
					type="button"
					className={`${sizeButtonBase} border-red-500 rounded-r-none ${shortButtonSelected}`}
					onClick={() => setSide('SHORT')}
				>
					SELL
				</button>
				<button 
					type="button"
					className={`${sizeButtonBase} border-green-500 rounded-l-none ${longButtonSelected}`}
					onClick={() => setSide('LONG')}
				>
					BUY
				</button>
			</div>

			<div className="my-4">
				<CustomInput
					name="amountx"
					label="Size"
					placeholder="0.00"
					unit={currentMarket.split('-')[0]}
					value={amount}
					onChange={setAmount}
				/>
				<CustomInput
					name="orderPricex"
					label="Entry Price"
					placeholder="0.00"
					unit="USD"
					value={orderPrice}
					onChange={setOrderPrice}
				/>
				<CustomInput
					name="oraclePricex"
					label="Oracle Price"
					placeholder="0.00"
					unit="USD"
					value={oraclePrice}
					onChange={setOraclePrice}
				/>
				<div className="bg-color-dark mt-4 rounded-md rounded-b-none text-white">
					<div className="flex justify-between py-4 px-4">
						<div>Total</div>
						<div>{ formatMoney(amount * orderPrice) }</div>
					</div>
				</div>
				{
					positionSizeWarning ?
					(
						<WarningButton message={positionSizeWarning} />
					): 
					leverageWarning ?
					(
						<WarningButton message={leverageWarning} />
					):
					(
						<button 
							type="button"
							onClick={handleAddPosition}
							className="w-full text-md px-5 py-2 mb-4 bg-blue-500 text-white rounded-md rounded-t-none hover:bg-blue-600 focus:outline-none"
						>
							Add Position
						</button>
					) 		
				}
			</div>

		</div>
	)
}

export default Aside