import React from "react";
import renderer from "react-test-renderer";
import Review from "./review";

it(`Review component render correct`, () => {
  const reviewMockData = {
    avatarUrl: `img/apartment-01.jpg`,
    comment: `Hello world`,
    date: `11 April`,
    rating: 4.2,
    userName: `Serhii`
  };

  const review = renderer
    .create(<Review {...reviewMockData}/>)
    .toJSON();

  expect(review).toMatchSnapshot();
});
