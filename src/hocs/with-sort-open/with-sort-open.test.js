import React from 'react';
import renderer from 'react-test-renderer';
import withSortOpen from './with-sort-open';

const MockComponent = () => <div />;
const MockComponentWrapped = withSortOpen(MockComponent);

it(`withSortOpen snapshot`, () => {
  const tree = renderer.create(<MockComponentWrapped />).toJSON();
  expect(tree).toMatchSnapshot();
});
