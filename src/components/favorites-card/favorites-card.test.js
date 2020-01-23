import React from 'react';
import renderer from 'react-test-renderer';
import {FavoritesCard} from './favorites-card.jsx';
import mockPlaces from '../../mocks/mock-offers.js';
import {StaticRouter} from 'react-router-dom';

it(`FavoritesCard snapshot`, () => {
  const tree = renderer.create(<StaticRouter>
    <FavoritesCard
      place={mockPlaces[0]}
      onRemoveFromFavoritesClick={jest.fn()}
    /></StaticRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
