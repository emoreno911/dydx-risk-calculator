import React, { createContext, useState, useEffect } from 'react'
import { toNumber, getAccountEquity, getMarginUsage } from '../utilities'

export const DataContext = createContext();

const logmessage = (msg) => {
	if (window.location.hostname === 'localhost')
		console.log(msg)
}

const defaultAccount = {
	collateral: 100,
	equity: 0,
	power: 0,
	marginUsage: 0,
	accountLeverage: 0
}

const DataContextProvider = (props) => {
	const [account, setAccount] = useState(defaultAccount)
	const [markets, setMarkets] = useState(null)
	const [positions, setPositions] = useState([])
	const [currentMarket, setCurrentMarket] = useState('BTC-USD')

	// current position
	const [side, setSide] = useState('LONG')
	const [amount, setAmount] = useState(0)
	const [orderPrice, setOrderPrice] = useState(0)
	const [oraclePrice, setOraclePrice] = useState(0)

	useEffect(async () => {
		const MARKETS = await (await fetch("https://api.dydx.exchange/v3/markets")).json()
		const mk = MARKETS['markets']
		setMarkets(mk)
		if (mk) {
			const oraclePrice = toNumber(mk['BTC-USD']['oraclePrice'])
			setAmount(toNumber(mk['BTC-USD']['minOrderSize']))
			setOraclePrice(oraclePrice)
			setOrderPrice(oraclePrice)
		}	
		
		window.document.body.style.overflowX = 'hidden'
	}, [])

	useEffect(() => {
		if (markets !== null) {
			const oraclePrice = toNumber(markets[currentMarket]['oraclePrice'])
			setAmount(toNumber(markets[currentMarket]['minOrderSize']))
			setOraclePrice(oraclePrice)
			setOrderPrice(oraclePrice)
		}
	}, [currentMarket])


	const isMobile = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}

	const addPositionComplex = (position) => {
		// what if same market?
		const existingPosition = positions.find(p => p.market === position.market)
		
		if (typeof existingPosition === "undefined") {
			setPositions(data => [...data, position])
			return
		}
		
		let size, side, orderPrice
		if (position.side === existingPosition.side) {
			size = position.size + existingPosition.size
			side = position.side
			// promEntry = totalSize * (p.entry/p.size + ep.entry/ep.size)
			orderPrice = (position.orderPrice*(position.size/size) + existingPosition.orderPrice*(existingPosition.size/size))
		}
		else {
			// sum positions, side is long if positive; short if negative
			// orderPrice will be the one of the side who prevailed
			size = position.size + existingPosition.size
			side = size < 0 ? 'SHORT' : 'LONG'

			const case1 = side === 'SHORT' && position.size < 0
			const case2 = side === 'LONG' && position.size > 0
			orderPrice = case1 || case2 ? position.orderPrice : existingPosition.orderPrice
		}

		const id = existingPosition.id
		const result = {...position, id, size, side, orderPrice }
		const arrayFiltered = positions.filter(p => p.market !== position.market)
		setPositions([...arrayFiltered, result])
	}

	const addPosition = (position) => {
		const accountEquity = getAccountEquity([...positions, position], account.collateral)
		const marginUsage = getMarginUsage([...positions, position], accountEquity)
		if (marginUsage > 0.99) {
			alert("This position couldn't be added because your margin usage could go over 100%")
			return
		}

		const existingPosition = positions.find(p => p.market === position.market)
		
		if (typeof existingPosition === "undefined") {
			setPositions(data => [...data, position])
			return
		}

		const confirm = window.confirm(`The current position for ${position.market} will be replaced, would you like to continue?`)
		if (confirm) {
			const dataFiltered = positions.filter(p => p.market !== position.market)
			setPositions([...dataFiltered, position])
		}
		
	}
	
	const removePosition = (id) => {
		setPositions(data => {
			const copy = [...data]
			const filtered = copy.filter(el => el.id !== id)

			return filtered
		})
	}

	const removeAllPositions = () => {
		setPositions([])
	}

	const data = {
		side,
		amount,
		orderPrice,
		oraclePrice,
		account,
		markets,
		positions,
		currentMarket
	}

	const fn = {
		isMobile,
		setCurrentMarket,
		setSide,
		setAccount,
		setAmount,
		setOrderPrice,
		setOraclePrice,
		addPosition,
		removePosition,
		removeAllPositions
	}

	return (
		<DataContext.Provider value={{ data, fn }}>
			{props.children}
		</DataContext.Provider>
	);
}

export default DataContextProvider;