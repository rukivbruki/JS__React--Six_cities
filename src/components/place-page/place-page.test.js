import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {PlacePage} from './place-page.jsx';
import mockPlaces from '../../mocks/mock-offers';

jest.mock(`../../utils/set-body-root-class`);

it(`PlacePage snapshot`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<PlacePage
    isLoaded={true}
    isAuthorazated={false}
    load={jest.fn()}
    onBookmarkClick={jest.fn()}
    nearPlaces={[mockPlaces[1], mockPlaces[1], mockPlaces[1]]}
    place={mockPlaces[0]}
  />);
  expect(tree).toMatchSnapshot();
});


