import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlaceCard} from "./place-card";

Enzyme.configure({adapter: new Adapter()});

describe(`PlaceCard callbacks are called correct`, () => {
  const onPlaceCardHover = jest.fn();
  const offer = {
    id: 834576,
    isFavorite: true,
    isPremium: true,
    previewImage: `img/apartment-01.jpg`,
    price: 120,
    rating: 43,
    title: `Beautiful & luxurious apartment at great location`,
    type: `Apartment`,
  };
  const placeCardComponent = shallow(
      <PlaceCard
        offer={offer}
        onSelect={jest.fn()}
        onAddFavorite={jest.fn()}
        onRemoveFavorite={jest.fn()}
        loadFavorites={jest.fn()}
        onCardHover={onPlaceCardHover}
      />
  );
  const placeCard = placeCardComponent.find(`.cities__place-card`);

  it(`сallbacks are called 3 times`, () => {
    placeCard.simulate(`mouseEnter`);
    placeCard.simulate(`mouseEnter`);
    placeCard.simulate(`mouseEnter`);

    expect(onPlaceCardHover).toHaveBeenCalledTimes(3);
  });

  it(`check hover on PlaceCard & called with correct argument`, () => {
    placeCard.simulate(`mouseEnter`);

    expect(onPlaceCardHover).toHaveBeenCalled();
    expect(onPlaceCardHover).toHaveBeenCalledWith(offer.id);
  });
});
