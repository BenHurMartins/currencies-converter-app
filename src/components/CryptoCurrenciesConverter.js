import { useState } from "react";
import '../styles.css';
import Selector from "./Selector";
import { convertCurrencyCrypto } from "../api";

const CryptoCurrenciesConverter = (props) => {

    const [fromCurrencyCrypto, setFromCurrencyCrypto] = useState('BTC')
    const [toCurrencyCrypto, setToCurrencyCrypto] = useState('USD')
    const [fromValueCrypto, setFromValueCrypto] = useState(0)
    const [toValueCrypto, setToValueCrypto] = useState(0)

    const handleFromValueCryptoChange = (e) => {
        const value = e.target.value.replace(',', '.')
        if (!isNaN(value)) {
            setFromValueCrypto(value)
        }
    }

    const handleFromCurrencyChangeCrypto = (e) => {
        setFromValueCrypto(0)
        setFromCurrencyCrypto(e.target.value);
    }
    const handleToCurrencyChangeCrypto = (e) => {
        setToValueCrypto(0)
        setToCurrencyCrypto(e.target.value);
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
        <>
            <p className="app-subtitle">
                Crypto to Currency
            </p>
            <div className="main-container">
                <div className="form-container">
                    <div className="half-container">
                        <p className="label">From:</p>
                        <input placeholder="0.00" min="0" value={fromValueCrypto} onChange={handleFromValueCryptoChange} />
                        <Selector value={fromCurrencyCrypto} onChange={handleFromCurrencyChangeCrypto} options={props.cryptoCurrenciesArray} currencies={props.cryptos} />
                    </div>
                    <div className="half-container">
                        <p className="label">To:</p>
                        <input placeholder="0.00" value={toValueCrypto} />
                        <Selector value={toCurrencyCrypto} onChange={handleToCurrencyChangeCrypto} options={props.currenciesArray} currencies={props.currencies} />
                    </div>
                </div>
                <div>
                    <button onClick={handleCryptoConversion}>Convert Crypto</button>
                </div>
            </div>
        </>
    )
}

export default CryptoCurrenciesConverter;