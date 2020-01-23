import React from 'react';
import renderer from 'react-test-renderer';
import withActivePlace from './with-active-place';

const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlace(MockComponent);

it(`withActivePlace snapshot`, () => {
  const tree = renderer.create(<MockComponentWrapped />).toJSON();
  expect(tree).toMatchSnapshot();
});
