import React, { useEffect, useState } from 'react';
import './styles.css';
import { getCryptoCurrencies, getCurrencies, convertCurrency, convertCurrencyCrypto } from "./api";
import Selector from "./components/Selector";


function App() {

  //default value
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [fromValue, setFromValue] = useState(0)
  const [toValue, setToValue] = useState(0)
  const [currenciesArray, setCurrenciesArray] = useState([])
  const [currencies, setCurrencies] = useState({})

  //crypto
  const [fromCurrencyCrypto, setFromCurrencyCrypto] = useState('BTC')
  const [toCurrencyCrypto, setToCurrencyCrypto] = useState('USD')
  const [fromValueCrypto, setFromValueCrypto] = useState(0)
  const [toValueCrypto, setToValueCrypto] = useState(0)
  const [cryptoCurrenciesArray, setCryptoCurrenciesArray] = useState([])
  const [cryptos, setCryptos] = useState([])

  useEffect(async () => {
    getCurrencies()
      .then(data => {
        setCurrenciesArray(Object.keys(data))
        setCurrencies(data)

      })
  }, [])

  useEffect(async () => {
    getCryptoCurrencies()
      .then(data => {
        let cryptoValues = {}
        const dataCryptosSimbols = data.map(item => {
          cryptoValues[item.symbol] = item.name
          return item.symbol
        })
        setCryptoCurrenciesArray(dataCryptosSimbols)
        setCryptos(cryptoValues)
      })
  }, [])

  //Change input events
  const handleFromValueChange = (e) => {
    const value = e.target.value.replace(',', '.')
    if (!isNaN(value)) {
      setFromValue(value)
    }
  }
  const handleFromValueCryptoChange = (e) => {
    const value = e.target.value.replace(',', '.')
    if (!isNaN(value)) {
      setFromValueCrypto(value)
    }
  }

  // Selector events  
  const handleFromCurrencyChange = (e) => {
    setFromValue(0)
    setFromCurrency(e.target.value);
  }
  const handleFromCurrencyChangeCrypto = (e) => {
    setFromValueCrypto(0)
    setFromCurrencyCrypto(e.target.value);
  }
  const handleToCurrencyChange = (e) => {
    setToValue(0)
    setToCurrency(e.target.value);
  }
  const handleToCurrencyChangeCrypto = (e) => {
    setToValueCrypto(0)
    setToCurrencyCrypto(e.target.value);
  }

  const handleConversion = () => {
    const value = parseFloat(fromValue).toFixed(2) == 0 ? parseFloat(1).toFixed(2) : parseFloat(fromValue).toFixed(2)
    setFromValue(value)

    convertCurrency(fromCurrency, toCurrency, value)
      .then(result => {
        setToValue(result)
      })
  }

  const handleCryptoConversion = () => {
    const value = parseFloat(fromValueCrypto).toFixed(2) == 0 ? parseFloat(1).toFixed(2) : parseFloat(fromValueCrypto).toFixed(2)
    setFromValueCrypto(value)
    convertCurrencyCrypto(fromCurrencyCrypto, toCurrencyCrypto, value)
      .then(result => {
        setToValueCrypto(result)
      })
  }

  return (
    <div className="app">
      <header className="app-header">
        <p className="app-title">
          Currency Converter
        </p>
      </header>
      <body className="app-body">
        <p className="app-subtitle">
          Currency
        </p>
        <div className="main-container">
          <div className="form-container">
            <div className="half-container">
              <p className="label">From:</p>
              <input placeholder="0.00" min="0" value={fromValue} step="0.01" title="Currency" pattern="^\d+(?:\.\d{1,2})?$" onChange={handleFromValueChange} />
              <Selector value={fromCurrency} onChange={handleFromCurrencyChange} options={currenciesArray} currencies={currencies} />
            </div>
            <div className="half-container">
              <p className="label">To:</p>
              <input placeholder="0.00" value={toValue} />
              <Selector value={toCurrency} onChange={handleToCurrencyChange} options={currenciesArray} currencies={currencies} />
            </div>
          </div>
          <div>
            <button onClick={handleConversion}>Convert</button>
          </div>
        </div>
        <p className="app-subtitle">
          Crypto to Currency
        </p>
        <div className="main-container">
          <div className="form-container">
            <div className="half-container">
              <p className="label">From:</p>
              <input placeholder="0.00" min="0" value={fromValueCrypto} onChange={handleFromValueCryptoChange} />
              <Selector value={fromCurrencyCrypto} onChange={handleFromCurrencyChangeCrypto} options={cryptoCurrenciesArray} currencies={cryptos} />
            </div>
            <div className="half-container">
              <p className="label">To:</p>
              <input placeholder="0.00" value={toValueCrypto} />
              <Selector value={toCurrencyCrypto} onChange={handleToCurrencyChangeCrypto} options={currenciesArray} currencies={currencies} />
            </div>
          </div>
          <div>
            <button onClick={handleCryptoConversion}>Convert Crypto</button>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
