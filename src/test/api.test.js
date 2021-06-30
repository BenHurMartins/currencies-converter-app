import { convertCurrency, convertCurrencyCrypto, getCryptoCurrencies, getCurrencies } from "../api";

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CurrenciesConverter from "../components/CurrenciesConverter";

describe('Api tests', () => {
    it('should return a list of cryptos',async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
            json: () => Promise.resolve({ status: 'Ok', data: [
                {symbol: 'BTC', name: 'Bitcoin'},
                {symbol: 'ETH', name: 'Ethereum'},
            ] }),
            })
        );
        const response = await getCryptoCurrencies()
        expect(response[0].symbol).toEqual('BTC')
        expect(response[1].symbol).toEqual('ETH')
        expect(response.length).toEqual(2)
    }); 
    it('should return an object of currencies',async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
            json: () => Promise.resolve({
                "AUD": "Australian Dollar",
                "BGN": "Bulgarian Lev",
                "BRL": "Brazilian Real"
                }),
            })
        );
        const response = await getCurrencies()
        expect(response['BRL']).toEqual('Brazilian Real')
    }); 
    it('should convert currency with plain values', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
            json: () => Promise.resolve({
                    rates: {
                        'BRL': 5.00,
                        'AUD': 1.50
                    }
            }),
            })
        );
        const response = await convertCurrency('USD', 'BRL', 2.00)
        expect(response).toEqual(parseFloat(10.00).toFixed(2))
    }); 
    it('should convert currency with decimal values', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
            json: () => Promise.resolve({
                    rates: {
                        'BRL': 5.00,
                        'AUD': 1.50
                    }
            }),
            })
        );
        const response = await convertCurrency('USD', 'BRL', 2.51)
        expect(response).toEqual(parseFloat(12.55).toFixed(2))
    }); 
    it('should convert from BTC to USD', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
            json: () => Promise.resolve({
                data: {
                    market_data: {
                        price_usd: 17000
                    }
                }
            }),
            })
        );
        const response = await convertCurrencyCrypto('BTC', 'USD', 1)
        expect(response).toEqual(parseFloat(17000.00).toFixed(2))
    }); 
    

})
