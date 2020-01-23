import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {MainPage} from './main-page.jsx';
import mockPlaces from '../../mocks/mock-offers.js';
import mockCities from '../../mocks/mock-cities.js';

jest.mock(`../../utils/set-body-root-class`);

it(`MainPage snapshot`, () => {
  const renderer = new ShallowRenderer();
  const result = renderer.render(<MainPage
    places={mockPlaces}
    cities={mockCities}
    activeCity={mockCities[0]}
    activePlace={null}
    isLoaded={true}
    loadingError={null}
    load={jest.fn()}
    onCityClick={jest.fn()}
    onActivatePlace={jest.fn()}
  />);
  expect(result).toMatchSnapshot();
});
