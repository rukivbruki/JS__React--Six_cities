import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';
import mockCities from '../../mocks/mock-cities.js';

it(`CitiesList snapshot`, () => {
  const tree = renderer.create(<CitiesList
    cities={mockCities}
    activeCity={mockCities[0]}
    onCityClick={jest.fn()}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
