import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CurrenciesConverter from "../components/CurrenciesConverter";
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });
    
describe('CurrencyConverter', () => {

    it('should render the component', ()=> {
        const optionsArray=[
            'USD', 'BRL'
        ]
        const currencies = {
            'USD': 'United States Dolar',
            'BRL': 'Brazilian Real'
        }
        const component = renderer.create(<CurrenciesConverter lang={'EN'} currenciesArray={optionsArray} currencies={currencies}/>)
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should show the text in english', () => {
        const cryptoInstance = shallow(<CurrenciesConverter lang={'EN'} />);
        const element = cryptoInstance.find('.app-subtitle');
        expect(element.text()).toBe('Currency');
    }); 
    
    it('should be in portuguese', () => {
        const cryptoInstance = shallow(<CurrenciesConverter lang={'PT_BR'} />);
        const element = cryptoInstance.find('.app-subtitle');
        expect(element.text()).toBe('Moeda');
    })
})
