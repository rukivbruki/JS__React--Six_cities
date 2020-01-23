import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withPlacesSort from "./with-places-sort";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withPlacesSort(MockComponent);

it(`Should change activeSort when call onSortClick`, () => {
  const wrapper = shallow(<MockComponentWrapped />);
  wrapper.props().onSortClick(wrapper.props().sortings[1]);
  expect(wrapper.state().activeSorting).toEqual(wrapper.props().sortings[1]);
});
