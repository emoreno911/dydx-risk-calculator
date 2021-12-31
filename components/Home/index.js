import Aside from "./Aside"
import Account from "./Account"
import PositionListMobile from "./PositionListMobile"
import PositionList from "./PositionListTBL2"
import PositionResume from "./PositionResume"
import DataContextProvider from "./context"


const HomePage = () => {
	return (
		<DataContextProvider>
			<div className="w-full flex flex-wrap overflow-hidden">
				<div className="w-full overflow-hidden md:w-2/6 lg:w-2/6 hidden md:block">
					<Aside />
				</div>
				<div className="w-full overflow-hidden md:w-4/6">
					<div className="max-w-screen-lg mx-auto p-4">
						<div className="flex flex-col md:flex-row-reverse">
							<Account />
							<div className="mb-2"></div>
							<PositionResume />
						</div>
						<div className="md:hidden">
							<Aside />
							<PositionListMobile />
						</div>
						<div className="hidden md:block">
							<PositionList />
						</div>
					</div>
				</div>
			</div>
		</DataContextProvider>
	)
}

export default HomePage