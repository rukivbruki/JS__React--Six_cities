import React from "react";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {SignForm} from './sign-form';
jest.mock(`../../index.js`, () => jest.fn().mockReturnValue(null));
jest.mock(`../../constants.js`, () => jest.fn().mockReturnValue(null));
configure({adapter: new Adapter()});

it(`SignForm form renders correctly`, () => {
  const signForm = shallow(<SignForm
    onInputChange={jest.fn()}
    sendAuthData={jest.fn()}
    email={`shramko.web@yahoo.com`}
    password={`12345`}
  />);

  expect(signForm).toMatchSnapshot();
});
