import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Faq from '../components/Faq'


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
    title: "DYDX Risk Calculator - FAQ",
    description: "Simulate position risk for DYDX Exchange",
    image: "http://waybackblog.byethost32.com/wp-content/uploads/2020/11/onlineprinters-oIpJ8koLx_s-unsplash.jpg",
    url: `https://headless-wp-blog-nextjs.vercel.app/`,
    sitename: "dydxrisk",
  }

  return (
    <Layout metadata={metadata}>
      <Header />
      <main className="max-w-5xl mx-auto py-6 md:py-10">
			  <div className="flex flex-wrap overflow-hidden">
          <Faq />
        </div>
      </main>
      <Footer />
    </Layout>
  )
}

export default Index
