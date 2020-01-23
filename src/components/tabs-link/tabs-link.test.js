import React from "react";
import renderer from "react-test-renderer";
import TabsLink from "./tabs-link";

const city = `Paris`;
const currentCity = `Moscow`;
const handleClick = jest.fn();

it(`Tab-link component render correct`, () => {
  const tabsTemplate = renderer.create(
      <TabsLink
        activeElement={currentCity}
        changeCurrentCity={handleClick}
        city={city}
        id={`o-Paris`}
        onSelect={handleClick}
      />
  ).toJSON();

  expect(tabsTemplate).toMatchSnapshot();
});
