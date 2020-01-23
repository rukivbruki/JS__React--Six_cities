import React from "react";
import renderer from "react-test-renderer";
import Goods from "./goods";

it(`Goods component render correct`, () => {
  const goods = [
    `Wi-Fi`,
    `Washing machine`,
    `Towels`,
    `Heating`,
    `Kitchen`
  ];

  const component = renderer
    .create(<Goods goods={goods}/>)
    .toJSON();

  expect(component).toMatchSnapshot();
});
