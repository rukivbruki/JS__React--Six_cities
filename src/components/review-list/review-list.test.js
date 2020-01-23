import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {ReviewList} from "./review-list";

configure({adapter: new Adapter()});

it(`list of reviews renders correctly`, () => {
  const review = shallow(<ReviewList
    isRequiredDataLoad={false}
    onLoadData={jest.fn()}
    reviews={[]}
    id={1}
  />);

  expect(review).toMatchSnapshot();
});
