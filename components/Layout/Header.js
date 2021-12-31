import dynamic from 'next/dynamic'

const DynamicModalRiskAdvice = dynamic(
  () => import('../Home/ModalRiskAdvice'),
  { ssr: false }
)

const DynamicModalVideo = dynamic(
  () => import('../Home/ModalVideo'),
  { ssr: false }
)

const Header = () => {
	return (
		<>
		<header className="max-w-5xl mx-auto pt-5">
			<div className="flex flex-wrap -mx-2 overflow-hidden px-5 lg:px-2 my-2">

				<div className="px-2 w-full overflow-hidden md:w-1/6 lg:w-1/3 xl:w-1/3 text-center md:text-left flex-grow">
						<h1 className="font-bold text-2xl header-title page-title">
							<a href="/">
								DYDX Risk Calculator
							</a>
						</h1>
						<ul className="mt-4 w-full">
							<li className="inline-block"><a className="block font-semibold pr-4 h-12" href="/">Home</a></li>
							<li className="inline-block"><a className="block font-semibold pr-4 h-12" href="/faq">FAQ</a></li>
							<li className="inline-block">
								<DynamicModalVideo />
							</li>
					</ul>
				</div>

				<div className="my-2 px-2 w-full overflow-hidden md:w-2/6 lg:w-1/3 xl:w-1/3 text-center md:text-right hidden md:flex items-start justify-end">
					<DynamicModalRiskAdvice />
				</div>
			</div>
    </header>
		</>
	)
}

export default Header