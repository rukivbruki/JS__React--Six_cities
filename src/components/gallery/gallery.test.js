import React from "react";
import renderer from "react-test-renderer";
import Gallery from "./gallery";

it(`Gallery component render correct`, () => {
  const photos = [
    `img/apartment-01.jpg`,
    `img/apartment-02.jpg`,
    `img/apartment-03.jpg`
  ];

  const gallery = renderer
    .create(<Gallery photos={photos}/>)
    .toJSON();

  expect(gallery).toMatchSnapshot();
});
