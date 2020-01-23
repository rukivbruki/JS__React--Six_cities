import React from 'react';
import renderer from 'react-test-renderer';
import withAuthorizationReqired from './with-authorization-reqired';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import NameSpace from "../../reducers/name-spaces";
const NAME_SPACE = NameSpace.USER;
const MockComponent = () => <div />;
const MockComponentWrapped = withAuthorizationReqired(MockComponent);

jest.mock(`../../utils/set-body-root-class`);

it(`withAuthorizationReqired snapshot then isAuthorazated=true`, () => {
  const store = createStore((state = {[NAME_SPACE]: {isAuthorazated: false}}) => (state));
  const tree = renderer.create(<Provider store={store}>
    <MockComponentWrapped />
  </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`withAuthorizationReqired snapshot then isAuthorazated=false`, () => {
  const store = createStore((state = {[NAME_SPACE]: {isAuthorazated: true}}) => (state));
  const tree = renderer.create(<Provider store={store}>
    <MockComponentWrapped />
  </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
