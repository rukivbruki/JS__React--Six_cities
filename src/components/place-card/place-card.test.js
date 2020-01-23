import React from 'react';
import renderer from 'react-test-renderer';
import {PlaceCard} from './place-card.jsx';
import mockPlaces from '../../mocks/mock-offers.js';
import {StaticRouter} from 'react-router-dom';

it(`PlaceCard snapshot`, () => {
  const tree = renderer.create(<StaticRouter>
    <PlaceCard
      place={mockPlaces[0]}
      onActivate={jest.fn()}
      onBookmarkClick={jest.fn()}
    /></StaticRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
