import Modal from "./Modal"
import { toFixedIfNecessary, getMarketLeverage } from "../utilities"

const ModalMarkets = ({markets, currentMarket, setMarket}) => {
	if (!markets)
		return <div className="bg-color-alt text-white text-center py-2">Loading...</div>

	const marketKeys = Object.keys(markets).sort()
	const handleClick = (e) => {
		e.preventDefault()
		const market = e.currentTarget.getAttribute('data-market')
		setMarket(market)
	}

	const isSelected = (market) => {
		return currentMarket.indexOf(market) !== -1 ? 'market-selected' : ''
	}

	return (
		<Modal
			activator={({ setShow }) => (
				<button 
					type="button" 
					className="bg-color-alt text-white font-semibold py-2 px-4 rounded inline-flex items-center justify-center w-full hover:bg-gray-400" 
					onClick={() => setShow(true)}
				>
					{ `Market: ${currentMarket} [${getMarketLeverage(currentMarket)}X]` }
				</button>
			)}
		>
			<div className="bg-color-accent p-4 rounded-md">
				<h4 className="text-white text-xl mb-4">Select Market</h4>
				<ul className="text-gray-700 pt-1">
				{
					marketKeys.map(key => (
						<li className="inline-block w-1/2 md:w-1/3" key={key}>
							<a 
								className={`bg-color-alt py-1 px-4 block whitespace-no-wrap m-1 rounded-full text-white text-sm text-center ${isSelected(key)}`} 
								href="#"
								data-market={key}
								onClick={handleClick}
							>
								<div>
									<span>{key}</span>
									<span className="text-xs font-bold rounded-md p-1">{getMarketLeverage(key)}X</span>
								</div>
								<small className="block">${toFixedIfNecessary(markets[key]['indexPrice'], 2)}</small>
							</a>
						</li>
					))
				}
				</ul>
			</div>
		</Modal>
	)
}

export default ModalMarkets