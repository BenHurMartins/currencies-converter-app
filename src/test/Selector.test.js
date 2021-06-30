import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Selector from "../components/Selector";
afterEach(cleanup);

test('Renders Selector.js correctly', () => {
  const currencies = {
    'USD': 'United States Dolar',
    'BRL': 'Brazilian Real'
  }
  const options = [
    'USD', 'BRL'
  ]
  let value = 'USD'

  const changeValue = (text) => { value = text }
  const component = renderer.create(<Selector value={value} onChange={changeValue} options={options} currencies={currencies} />)

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

