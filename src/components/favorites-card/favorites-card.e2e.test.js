import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {FavoritesCard} from './favorites-card.jsx';
import mockPlaces from '../../mocks/mock-offers.js';
import {StaticRouter} from 'react-router-dom';

configure({adapter: new Adapter()});

describe(`FavoritesCard correctly work`, () => {
  it(`When user click on bookmark button invoked onRemoveFromFavoritesClick`, () => {
    const onRemoveFromFavoritesClick = jest.fn();
    const favoritesCard = mount(<StaticRouter><FavoritesCard
      place={mockPlaces[0]}
      onRemoveFromFavoritesClick={onRemoveFromFavoritesClick}
    /></StaticRouter>);
    const bookmarkButton = favoritesCard.find(`.place-card__bookmark-button`);
    bookmarkButton.simulate(`click`);
    expect(onRemoveFromFavoritesClick).toHaveBeenCalledTimes(1);
    expect(onRemoveFromFavoritesClick.mock.calls[0][0]).toBe(mockPlaces[0]);
  });
});


