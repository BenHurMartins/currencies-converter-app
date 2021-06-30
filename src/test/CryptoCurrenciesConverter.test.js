import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CryptoCurrenciesConverter from "../components/CryptoCurrenciesConverter";
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });


describe('CryptoCurrencyConverter', () => {

    
    it('should render the component', ()=> {
        const optionsArray=[
            'USD', 'BRL'
        ]
        const optionsCryptoArray=[
            'BTC', 'ETH'
        ]
        const currencies = {
            'USD': 'United States Dolar',
            'BRL': 'Brazilian Real'
        }
        const cryptos = {
            'BTC': 'Bitcoin',
            'ETH': 'Ethereum'
        }
        const component = renderer.create(<CryptoCurrenciesConverter lang={'EN'} cryptoCurrenciesArray={optionsCryptoArray} currencies={currencies} currenciesArray={optionsArray} cryptos={cryptos}/>)
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should show the text in english', () => {
        const cryptoInstance = shallow(<CryptoCurrenciesConverter lang={'EN'} />);
        const element = cryptoInstance.find('.app-subtitle');
        expect(element.text()).toBe('Crypto Currency');
    }); 
    
    it('should be in portuguese', () => {
        const cryptoInstance = shallow(<CryptoCurrenciesConverter lang={'PT_BR'} />);
        const element = cryptoInstance.find('.app-subtitle');
        expect(element.text()).toBe('Cripto Moeda');
    })
})