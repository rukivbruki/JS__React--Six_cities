import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SignInPage} from "./sign-in-page.jsx";

configure({adapter: new Adapter()});
jest.mock(`../../utils/set-body-root-class`);

describe(`SignInPage correctly work`, () => {
  it(`When user submit form call submitAuthorization with parameters`, () => {
    const mockSubmitAuthorization = jest.fn();
    const mockOnInputChange = jest.fn();
    const formSendPrevention = jest.fn();
    const mockFormData = {
      email: `email`, password: `password`,
    };
    const signInPage = shallow(<SignInPage
      isAuthorazated={false}
      authorizationError={``}
      formData={mockFormData}
      onInputChange={mockOnInputChange}
      submitAuthorization={mockSubmitAuthorization}
    />);

    const form = signInPage.find(`.login__form`);
    form.simulate(`submit`, {preventDefault: formSendPrevention});

    expect(formSendPrevention).toHaveBeenCalledTimes(1);
    expect(mockSubmitAuthorization).toHaveBeenCalledTimes(1);
    expect(mockSubmitAuthorization.mock.calls[0][0]).toBe(mockFormData.email);
    expect(mockSubmitAuthorization.mock.calls[0][1]).toBe(mockFormData.password);
  });

  it(`When user change input call onInputChange`, () => {
    const mockSubmitAuthorization = jest.fn();
    const mockOnInputChange = jest.fn();
    const mockFormData = {
      email: `email`, password: `password`,
    };
    const signInPage = shallow(<SignInPage
      isAuthorazated={false}
      authorizationError={``}
      formData={mockFormData}
      onInputChange={mockOnInputChange}
      submitAuthorization={mockSubmitAuthorization}
    />);

    const inputEmail = signInPage.find(`input[name="email"]`);
    inputEmail.simulate(`change`);

    const inputPassword = signInPage.find(`input[name="password"]`);
    inputPassword.simulate(`change`);

    expect(mockOnInputChange).toHaveBeenCalledTimes(2);
  });
});
