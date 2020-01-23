import React from "react";
import renderer from "react-test-renderer";
import {PlacesList} from "./places-list";

jest.mock(`../place-card/place-card.jsx`, () => jest.fn().mockReturnValue(null));

it(`PlacesList component render correct`, () => {
  const OFFERS = [
    {
      id: 1,
      city: {
        name: `Hamburg`,
        location: [53.570341000000006, 9.975654],
        zoom: 12
      },
      title: `Amazing and Extremely Central Flatn`,
      previewImage: `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
      isPremium: false,
      isFavorite: false,
      price: 103,
      rating: 4.3,
      type: `room`,
    },
    {
      id: 2,
      city: {
        name: `Paris`,
        location: [48.846610000000005, 2.374499],
        zoom: 12
      },
      title: `Canal View Prinsengracht`,
      previewImage: `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
      price: 109,
      isPremium: false,
      isFavorite: false,
      rating: 4,
      type: `room`,
    },
  ];

  const app = renderer
    .create(
        <PlacesList
          offers={OFFERS}
          changeActiveOffer={jest.fn()}
          onSelect={jest.fn()}
        />)
    .toJSON();

  expect(app).toMatchSnapshot();
});
