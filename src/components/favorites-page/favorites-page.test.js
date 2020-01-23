import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {FavoritePage} from './favorites-page';
import mockPlaces from '../../mocks/mock-offers';

jest.mock(`../../utils/set-body-root-class`);

it(`FavoritePage snapshot`, () => {
  const renderer = new ShallowRenderer();
  const result = renderer.render(<FavoritePage
    loadData={jest.fn()}
    isLoaded={true}
    loadingError={null}
    favorites={[{
      city: {name: `city`},
      offers: mockPlaces
    }]}
  />);
  expect(result).toMatchSnapshot();
});

