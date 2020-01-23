import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Header} from './header';
import {StaticRouter} from 'react-router-dom';

configure({adapter: new Adapter()});

it(`When user click logout call logout()`, () => {
  const mockLogout = jest.fn();
  const linkPrevention = jest.fn();
  const header = mount(<StaticRouter><Header
    isAuthorazated={true}
    authorizationData={{email: `some@email.com`}}
    onLogout={mockLogout}
  /></StaticRouter>);
  const logoutLink = header.find(`.logout a`);
  logoutLink.simulate(`click`, {preventDefault: linkPrevention});
  expect(mockLogout).toHaveBeenCalledTimes(1);
  expect(linkPrevention).toHaveBeenCalledTimes(1);
});


