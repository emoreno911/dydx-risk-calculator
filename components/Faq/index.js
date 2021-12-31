const FaqPage = () => {
	return (
		<div className="w-full overflow-hidden text-white pb-4 px-4">
			<h2 className="text-xl font-bold mb-8">Frequent Asked Questions</h2>

			<h3 className="text-lg mt-4 mb-2">What is DYDX Risk Calculator?</h3>
			<p className="text-gray-300">
			The risk calculator is a very useful tool that will help you to check different scenarios to improve your trading strategies and risk management while using DYDX Exchange.
			</p>

			<h3 className="text-lg mt-4 mb-2">How does Cross Margin work?</h3>
			<p className="text-gray-300">
				Margin is shared between open
				positions with the same settlement cryptocurrency. When needed,
				a position will draw more margin from the total account balance
				of the corresponding cryptocurrency to avoid liquidation
			</p>

			<h3 className="text-lg mt-4 mb-2">How does Isolated Margin work?</h3>
			<p className="text-gray-300">
				Margin assigned to a position is restricted to a certain amount.
				If the margin falls below the Maintenance Margin level, the
				position is liquidated. However, you can add and remove margin
				at will under this method.
			</p>

			<h3 className="text-lg mt-4 mb-2">What is a Stop Loss Order?</h3>
			<p className="text-gray-300">
				A stop-loss order is an order placed with a broker to buy or
				sell a security when it reaches a certain price. Stop-loss orders
				are designed to limit an investor's loss on a position in a
				security and are different from stop-limit orders. When a stock
				falls below the stop price the order becomes a market order and
				it executes at the next available price.
			</p>

			<h3 className="text-lg mt-4 mb-2">What is a Liquidation Event?</h3>
			<p className="text-gray-300">
				A liquidation event occurs when a trader's position is closed
				forcibly by the exchange because the trader ran out of initial
				margin (the amount you used to open your position).
				When the price begins to move against the trader, the losses are
				paid for from the margin provided. If the losses exceed the
				margin provided, the trader is liquidated.
			</p>

			<h3 className="text-lg mt-4 mb-2">Where the prices data feed come from?</h3>
			<p className="text-gray-300">
				The feed of prices comes from DYDX's public API&nbsp; 
				<a href="https://api.dydx.exchange/v3/markets" target="_blank" className="underline">https://api.dydx.exchange/v3/markets</a>
			</p>

			<h3 className="text-lg mt-4 mb-2">Which formulas are we using to calculate values?</h3>
			<p className="text-gray-300">
				You can find those formulas in DYDX's docs&nbsp; 
				<a href="https://docs.dydx.exchange/#margin" target="_blank" className="underline">https://docs.dydx.exchange/#margin</a>
			</p>

			<h3 className="text-lg mt-4 mb-2" id="#about">Who are we?</h3>
			<p className="text-gray-300">
				We're a small and dynamic team who likes to make cool things for Web2 and Web3. 
			</p>
			<p className="text-gray-300 my-4">
			Miss Brightside is the Marketing Strategist, 
			she uses the power of the lightning to put together awesome investigations and content. Her cat thinks he's a God
			</p>
			<p className="text-gray-300">
			Mr. Robot is the Software Developer, he codes stuning and usable webapps. 
			He trade to make life changing money but have to code to survive his trading
			</p>

		</div>
	)
}

export default FaqPage