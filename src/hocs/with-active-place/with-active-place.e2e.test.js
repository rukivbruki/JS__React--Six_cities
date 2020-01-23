import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActivePlace from "./with-active-place";

configure({adapter: new Adapter()});

const mockPlace = {
  id: 1,
  isPremium: true,
  picture: `apartment-01.jpg`,
  price: 120,
  rating: 93,
  title: `Beautiful &amp; luxurious apartment at great location`,
  type: `Apartment`,
  coordinates: [52.3909553943508, 4.85309666406198],
  city: `Amsterdam`,
};

const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlace(MockComponent);

it(`Should change activePlace when call onActivatePlace`, () => {
  const wrapper = shallow(<MockComponentWrapped />);
  wrapper.props().onActivatePlace(mockPlace);
  expect(wrapper.state().activePlace).toEqual(mockPlace);
});
