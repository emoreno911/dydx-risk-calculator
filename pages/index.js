import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Home from '../components/Home'


export const getStaticProps = async () => {
  const MARKETS = [] //await (await fetch("https://api.stage.dydx.exchange/v3/markets")).json()
  return {
    props: {
      markets: MARKETS
    }
  }
}

const Index = ({ markets = [] }) => {
  const metadata = {
    title: "DYDX Risk Calculator",
    description: "Simulate position risk for DYDX Exchange",
    image: "http://waybackblog.byethost32.com/wp-content/uploads/2020/11/onlineprinters-oIpJ8koLx_s-unsplash.jpg",
    url: `https://www.dydxriskcalculator.xyz/`,
    sitename: "dydxriskcalculator",
  }

  return (
    <Layout metadata={metadata}>
      <Header />
      <main className="max-w-5xl mx-auto py-6 md:py-10">
			  <div className="flex flex-wrap overflow-hidden">
          <Home />
        </div>
      </main>
      <Footer />
    </Layout>
  )
}

export default Index
