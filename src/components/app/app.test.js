import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {App} from './app.jsx';

it(`App snapshot`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<App/>);
  expect(tree).toMatchSnapshot();
});
