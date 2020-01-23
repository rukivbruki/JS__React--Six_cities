import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withForm from "./with-form";

configure({adapter: new Adapter()});

it(`withForm should init default values on create`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withForm({name: `some text`})(MockComponent);
  const wrapper = shallow(<MockComponentWrapped />);
  expect(wrapper.state().formData).toEqual({
    [`name`]: `some text`
  });
});

it(`Should change activePlace when call onActivatePlace`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withForm()(MockComponent);
  const wrapper = shallow(<MockComponentWrapped />);
  const name = `name`;
  const value = `text`;
  const mockEvent = {target: {name, value}};
  wrapper.props().onInputChange(mockEvent);
  expect(wrapper.state().formData).toEqual(expect.objectContaining({
    [name]: value
  }));
});
