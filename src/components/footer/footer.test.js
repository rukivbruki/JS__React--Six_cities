import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './footer.jsx';
import {StaticRouter} from "react-router-dom";

it(`Footer snapshot`, () => {
  const tree = renderer.create(<StaticRouter>
    <Footer />
  </StaticRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
