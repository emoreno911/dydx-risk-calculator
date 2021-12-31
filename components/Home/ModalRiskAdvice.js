import Modal from "./Modal"

const ModalRiskAdvice = ({}) => {
	return (
		<Modal
			activator={({ setShow }) => (
				<button 
					type="button" 
					className="flex text-sm px-5 py-2 text-white rounded-md bg-color-alt focus:outline-none"
					onClick={() => setShow(true)}
				>
					<div>
						<span className="block text-xl">Feeling Risky?</span>
						<small className="text-sm">click here!</small>
					</div>
				</button>
			)}
		>
			<div className="bg-color-accent pt-4 pb-8 px-8 rounded-md text-white">
				<h4 className=" text-xl mb-6">Risk Management Daily Sheet advices</h4>
				<ul className="list-disc pl-4">
					<li className="mb-4">Don't invest what you are not willing to lose.</li>
					<li className="mb-4 hidden">Be true to your strategy. If you have already made your trading way calculations it's much better to modify before starting from zero.</li>
					<li className="mb-4">Focus on analysis and not feelings.</li>
					<li className="mb-4">Remember DYDX uses Cross Margin by default, this way all positions share your account balances as collateral.</li>
					<li className="mb-4">Isolated Margin can be emulated by creating separate accounts (using a new wallet address)</li>
					<li className="mb-4">Use Stop orders to limit your losses and set limit orders at price target</li>
					<li>
						<span>In order to calculate your Position Size, you need to know your:</span>
						<ol className="list-decimal pl-6 py-2">
							<li>Risk Amount</li>
							<li>Entry</li>
							<li>Stop Loss</li>
						</ol>
						<p className="pb-2">If my Capital is $1,000 and I am risking 2% per trade, it means if my Stop Loss gets triggered, my losses will be limited to $20 ($1000 x 0.02 = $20). In other words, I will lose $20 if my Stop Loss is triggered.&nbsp;</p>
						<p>So if the TA for a trade indicates me a TP of 22% and a SL of 8% my position size will be $20/0.08 = $250 and my potential profit for this trade will be $250*0.22 = $55</p>
					</li>
				</ul>
			</div>
		</Modal>
	)
}

export default ModalRiskAdvice