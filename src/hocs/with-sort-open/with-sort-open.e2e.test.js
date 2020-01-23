import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withSortOpen from "./with-sort-open";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withSortOpen(MockComponent);

it(`Should change isSortOpen state when call onOpenSortClick`, () => {
  const wrapper = shallow(<MockComponentWrapped />);
  wrapper.props().onOpenSortClick();
  expect(wrapper.state().isSortOpen).toEqual(true);
  wrapper.props().onOpenSortClick();
  expect(wrapper.state().isSortOpen).toEqual(false);
});
