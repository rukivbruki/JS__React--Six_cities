import React from 'react';
import renderer from 'react-test-renderer';
import {Header} from './header.jsx';
import {StaticRouter} from "react-router-dom";

it(`Header snapshot`, () => {
  const tree = renderer.create(<StaticRouter>
    <Header
      isAuthorazated={true}
      authorizationData={{email: `some@email.com`}}
      onLogout={jest.fn()}
    />
  </StaticRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
