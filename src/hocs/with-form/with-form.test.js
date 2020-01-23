import React from 'react';
import renderer from 'react-test-renderer';
import withForm from './with-form';

const MockComponent = () => <div />;
const MockComponentWrapped = withForm()(MockComponent);

it(`withForm snapshot`, () => {
  const tree = renderer.create(<MockComponentWrapped />).toJSON();
  expect(tree).toMatchSnapshot();
});
