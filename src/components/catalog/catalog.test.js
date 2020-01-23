import React from "react";
import renderer from "react-test-renderer";
import {Catalog} from "./catalog";
import {OFFERS} from "../../mocks/offers";

jest.mock(`../map/map.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../tabs/tabs.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../sort/sort.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../places-list/places-list.jsx`, () => jest.fn().mockReturnValue(null));

const citiesCoordinates = [[52.123123, 4.8123123], [52.21313, 4.9123123]];

it(`Catalog component render correct`, () => {
  const catalog = renderer
    .create(
        <Catalog
          citiesCoordinates={citiesCoordinates}
          currentCity={`NY`}
          offers={OFFERS}
          mapCoordinates={[]}
        />)
    .toJSON();

  expect(catalog).toMatchSnapshot();
});
