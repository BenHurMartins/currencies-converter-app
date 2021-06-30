import React, { useEffect, useState } from 'react';
import './styles.css';
import { getCryptoCurrencies, getCurrencies, } from "./api";
import CurrenciesConverter from "./components/CurrenciesConverter";
import CryptoCurrenciesConverter from "./components/CryptoCurrenciesConverter";
import { i18n } from "./i18n";


function App() {

  const [lang, setLang] = useState('EN')
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
      <div className="i18n">
        <button className={lang == 'EN' ? "langSelected" : null} onClick={() => setLang('EN')}>EN</button>
        <button className={lang == 'PT_BR' ? "langSelected" : null} onClick={() => setLang('PT_BR')} >PT</button>
      </div>
      <header className="app-header">
        <p className="app-title">
          {i18n.title[lang]}
        </p>
      </header>
      <body className="app-body">
        <CurrenciesConverter
          currenciesArray={currenciesArray}
          currencies={currencies}
          lang={lang}
        />
        <CryptoCurrenciesConverter
          cryptoCurrenciesArray={cryptoCurrenciesArray}
          currenciesArray={currenciesArray}
          cryptos={cryptos}
          currencies={currencies}
          lang={lang}
        />
      </body>
    </div>
  );
}

export default App;
