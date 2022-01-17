import React, { useContext, useState } from "react"
import Modal from "./Modal"
import CustomInput from './CustomInput'
import { DataContext } from './context'

const ModalPositionSetup = ({market}) => {
	const { fn, data:{positions} } = useContext(DataContext)
	const [riskedCollateral, setRiskedCollateral] = useState()
	const [targetPercent, setTargetPercent] = useState()
	const [stopPercent, setStopPercent] = useState()

	const current = positions.find(p => p.market === market)
	console.log(current)
	const entryPrice = current.orderPrice

	const _targetPercent = targetPercent/100
	const _stopPercent = stopPercent/100
	const size = riskedCollateral / _stopPercent
	const sizeTokens = size / entryPrice

	const sideMultiplier = current.side === 'LONG' ? 1 : -1
	const sl = 1*entryPrice - (entryPrice * _stopPercent * sideMultiplier)
	const tp = 1*entryPrice + (entryPrice * _targetPercent * sideMultiplier)
	const profit = size * _targetPercent
	const risk = riskedCollateral

	return (
		<Modal
			activator={({ setShow }) => (
				<button 
					type="button" 
					className="flex focus:outline-none"
					onClick={() => setShow(true)}
				>
					<div>
						<span className="block text-md text-red-300">{market}</span>
					</div>
				</button>
			)}
		>
			<div className="bg-color-accent p-4 rounded-md">
				<h4 className="text-white text-xl mb-4">Position Setup</h4>
				<p style={{minWidth: '300px'}}>&nbsp;</p>
					
				<CustomInput
					name="entryPrice"
					label="Entry Price"
					placeholder="0.00"
					unit={current.market.split('-')[0]}
					value={current.orderPrice}
					onChange={() => {}}
				/>
				<CustomInput
					name="riskedCollateral"
					label="Risked Collateral"
					placeholder="0.00"
					unit="USDC"
					value={riskedCollateral}
					onChange={setRiskedCollateral}
				/>
				<CustomInput
					name="targetPercent"
					label="Target Percent"
					placeholder="0.00"
					unit="%"
					value={targetPercent}
					onChange={setTargetPercent}
				/>
				<CustomInput
					name="stopPercent"
					label="Stop Percent"
					placeholder="0.00"
					unit="%"
					value={stopPercent}
					onChange={setStopPercent}
				/>

				<div className="text-gray-100 py-4">
					<div className="flex justify-between">
						<div>Size</div>
						<div>
							{sizeTokens} BTC
						</div>
					</div>
					<div className="flex justify-between">
						<div>Take Profit</div>
						<div>
							{tp} USD
						</div>
					</div>
					<div className="flex justify-between">
						<div>Stop Loss</div>
						<div>
							<div>{sl} USD</div>
						</div>
					</div>
					<div className="flex justify-between">
						<div>Reward/Risk</div>
						<div>{profit}/{risk} USD</div>
					</div>
				</div>

			</div>

		</Modal>
	)
}

export default ModalPositionSetup