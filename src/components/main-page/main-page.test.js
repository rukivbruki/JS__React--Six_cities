import React from "react";
import renderer from "react-test-renderer";
import {OFFERS} from "../../mocks/offers";
import MainPage from "./main-page";

jest.mock(`../catalog/catalog.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../header/header.jsx`, () => jest.fn().mockReturnValue(null));
const citiesCoordinates = [[52.123123, 4.8123123], [52.21313, 4.9123123]];

it(`MainPage component render correct`, () => {
  const app = renderer
    .create(
        <MainPage
          citiesCoordinates={citiesCoordinates}
          offers={OFFERS}
        />)
    .toJSON();

  expect(app).toMatchSnapshot();
});
