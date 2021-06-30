const LATEST = 'https://api.frankfurter.app/latest'
const LIST = 'https://api.frankfurter.app/currencies'
const LIST_CRYPTO = 'https://data.messari.io/api/v2/assets?fields=symbol,name'
const LATEST_CRYPTO = 'https://data.messari.io/api/v1/assets/'

// I would not put this parameter in a production app, but for a challenge i believe it is ok
export const key = 'ed22077e84cdd74b569cd87b51005f1c'


export const getCryptoCurrencies = async () => {
    return new Promise(
        (resolve, reject) => {
            fetch(`${LIST_CRYPTO}`, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    const cryptoSymbols = data.data.map(item => item.symbol)
                    resolve(data.data)

                })
                .catch(err => {
                    reject(err)
                })
        }
    )
}
export const getCurrencies = async () => {
    return new Promise(
        (resolve, reject) => {
            fetch(`${LIST}`, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        }
    )
}

export const convertCurrency = async (fromCurrency, toCurrency, value) => {
    return new Promise(
        (resolve, reject) => {
            fetch(`${LATEST}?from=${fromCurrency}`, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    resolve((data.rates[toCurrency] * value).toFixed(2))
                })
                .catch(err => {
                    reject(err)
                })
        }
    )
}

export const convertCurrencyCrypto = async (fromCurrency, toCurrency, value) => {
    return new Promise(
        (resolve, reject) => {
            fetch(`${LATEST_CRYPTO}${fromCurrency.toLowerCase()}/metrics`, { method: 'GET' })
                .then(response => response.json())
                .then(({ data }) => {
                    if (toCurrency == 'USD') {
                        resolve((data.market_data.price_usd * value).toFixed(2))
                    } else {
                        fetch(`${LATEST}?from=USD`, { method: 'GET' })
                            .then(response => response.json())
                            .then(currency => {
                                resolve(((currency.rates[toCurrency] * data.market_data.price_usd) * value).toFixed(2))
                            })
                            .catch(err => {
                                reject(err)
                            })
                    }
                })
                .catch(err => {
                    reject(err)
                })
        }
    )
}