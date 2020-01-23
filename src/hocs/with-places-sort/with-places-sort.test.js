import React from 'react';
import renderer from 'react-test-renderer';
import withPlacesSort from './with-places-sort';

const MockComponent = () => <div />;
const MockComponentWrapped = withPlacesSort(MockComponent);

it(`withPlacesSort snapshot`, () => {
  const tree = renderer.create(<MockComponentWrapped />).toJSON();
  expect(tree).toMatchSnapshot();
});
