import { useState } from "react";
import '../styles.css';
import Selector from "./Selector";
import { convertCurrency } from "../api";

const CurrenciesConverter = (props) => {

    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('EUR')
    const [fromValue, setFromValue] = useState(0)
    const [toValue, setToValue] = useState(0)

    const handleFromValueChange = (e) => {
        const value = e.target.value.replace(',', '.')
        if (!isNaN(value)) {
            setFromValue(value)
        }
    }
    const handleFromCurrencyChange = (e) => {
        setFromValue(0)
        setFromCurrency(e.target.value);
    }
    const handleToCurrencyChange = (e) => {
        setToValue(0)
        setToCurrency(e.target.value);
    }

    const handleConversion = () => {
        const value = parseFloat(fromValue).toFixed(2) == 0 ? parseFloat(1).toFixed(2) : parseFloat(fromValue).toFixed(2)
        setFromValue(value)

        convertCurrency(fromCurrency, toCurrency, value)
            .then(result => {
                setToValue(result)
            })
            .catch(err => {
                alert("Error trying to convert currencies, try again later.")
            })
            .catch(err => {
                alert("Error: " + err.error_message)
            })
    }

    return (
        <>
            <p className="app-subtitle">
                Currency
            </p>
            <div className="main-container">
                <div className="form-container">
                    <div className="half-container">
                        <p className="label">From:</p>
                        <input placeholder="0.00" min="0" value={fromValue} step="0.01" title="Currency" pattern="^\d+(?:\.\d{1,2})?$" onChange={handleFromValueChange} />
                        <Selector value={fromCurrency} onChange={handleFromCurrencyChange} options={props.currenciesArray} currencies={props.currencies} />
                    </div>
                    <div className="half-container">
                        <p className="label">To:</p>
                        <input placeholder="0.00" value={toValue} />
                        <Selector value={toCurrency} onChange={handleToCurrencyChange} options={props.currenciesArray} currencies={props.currencies} />
                    </div>
                </div>
                <div>
                    <button onClick={handleConversion}>Convert</button>
                </div>
            </div>
        </>
    )
}

export default CurrenciesConverter;