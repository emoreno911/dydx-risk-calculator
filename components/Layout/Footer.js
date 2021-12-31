const Footer = () => {
	return (
		<footer className="text-white text-center sm:text-left bg-color-dark">
			<div className="max-w-5xl mx-auto pb-10 pt-10 text-gray-900">
				<ul>
						<li className="inline-block"><a className="block font-semibold px-3 h-12" href="/">Home</a></li>
						<li className="inline-block"><a className="block font-semibold px-3 h-12" href="/faq">FAQ</a></li>
				</ul>
				<div className="sm:flex px-3">
						<div className="w-full sm:w-1/2">
								<div>
									{/* <img src="/img/isotipo.png" alt="droptracker logo" className="h-12 mx-auto md:-ml-4" /> */}
									<span className="block text-lg font-light font-bold h-30 page-title">DYDX Risk Calculator</span>
									
								</div>
								<span className="block pt-1 text-xs tracking-wider font-light">&copy;2020 Lightning Robot Inc. All rights reserved.</span>
						</div>
						<div className="w-full sm:w-1/2 text-center md:text-right mt-10 sm:mt-0">
							<a href="#" title="Twitter" className="inline-block text-lg w-16 ml-6">
								🤖⚡
							</a>
						</div>
				</div>
			</div>
    </footer>
	)
}

export default Footer