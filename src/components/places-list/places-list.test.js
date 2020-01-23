import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PlacesList from './places-list';
import mockPlaces from '../../mocks/mock-offers.js';
import mockCities from '../../mocks/mock-cities.js';

const mockSortings = [
  {
    name: `Sort 1`,
    sortFunction: null,
  },
  {
    name: `Sort 2`,
    sortFunction: (place1, place2) => place1.price - place2.price,
  },
];

it(`PlacesList snapshot`, () => {
  const renderer = new ShallowRenderer();
  const result = renderer.render(<PlacesList
    places={mockPlaces}
    city={mockCities[0]}
    activePlace={null}
    onActivatePlace={jest.fn()}
    isSortOpen={false}
    onOpenSortClick={jest.fn()}
    activeSorting={mockSortings[0]}
    sortings={mockSortings}
    onSortClick={jest.fn()}
  />);
  expect(result).toMatchSnapshot();
});
