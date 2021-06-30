import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from "../App";
afterEach(cleanup);

test('Renders App.js correctly', () => {
  const component = renderer.create(<App />)

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

it('Should Start the component with english language selected', () => {
  const { getByText } = render(
    <App />,
  );

  expect(getByText(/Currency Converter/i)).toBeTruthy();

})
it('Should change the text after another language is selected', () => {
  const { getByText, getAllByText } = render(
    <App />,
  );

  expect(getAllByText(/PT/i)[0]).toBeTruthy();

  fireEvent.click(getAllByText(/PT/i)[0])


  expect(getByText(/Conversor de Moedas/i)).toBeTruthy();


})