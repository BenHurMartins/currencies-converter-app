import React, { useEffect, useState } from 'react';
import './styles.css';
import { getCryptoCurrencies, getCurrencies, } from "./api";
import CurrenciesConverter from "./components/CurrenciesConverter";
import CryptoCurrenciesConverter from "./components/CryptoCurrenciesConverter";


function App() {

  //default value
  const [currenciesArray, setCurrenciesArray] = useState([])
  const [currencies, setCurrencies] = useState({})

  //crypto
  const [cryptoCurrenciesArray, setCryptoCurrenciesArray] = useState([])
  const [cryptos, setCryptos] = useState([])

  useEffect(async () => {
    getCurrencies()
      .then(data => {
        setCurrenciesArray(Object.keys(data))
        setCurrencies(data)
      })
      .catch(err => {
        alert("Error trying to get the currencies, try again later")
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
      .catch(err => {
        alert("Error: " + err.error_message)
      })
  }, [])


  return (
    <div className="app">
      <header className="app-header">
        <p className="app-title">
          Currency Converter
        </p>
      </header>
      <body className="app-body">
        <CurrenciesConverter
          currenciesArray={currenciesArray}
          currencies={currencies}
        />
        <CryptoCurrenciesConverter
          cryptoCurrenciesArray={cryptoCurrenciesArray}
          currenciesArray={currenciesArray}
          cryptos={cryptos}
          currencies={currencies}
        />
      </body>
    </div>
  );
}

export default App;
