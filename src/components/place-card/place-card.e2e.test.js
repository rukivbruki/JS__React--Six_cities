import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {PlaceCard} from './place-card.jsx';
import mockPlaces from '../../mocks/mock-offers.js';
import {StaticRouter} from 'react-router-dom';

configure({adapter: new Adapter()});

describe(`PlaceCard correctly work`, () => {
  it(`When user click on image invoked onActivate`, () => {
    const onActivate = jest.fn();
    const linkPrevention = jest.fn();
    const app = mount(<StaticRouter><PlaceCard
      place={mockPlaces[0]}
      onActivate={onActivate}
      onBookmarkClick={jest.fn()}
    /></StaticRouter>);
    const imageLink = app.find(`.place-card__image-wrapper a`);
    imageLink.simulate(`click`, {preventDefault: linkPrevention});
    expect(onActivate).toHaveBeenCalledTimes(1);
    expect(onActivate.mock.calls[0][0]).toBe(mockPlaces[0]);
    expect(linkPrevention).toHaveBeenCalledTimes(1);
  });

  it(`When user click on bookmark button invoked onBookmarkClick`, () => {
    const onBookmarkClick = jest.fn();
    const app = mount(<StaticRouter><PlaceCard
      place={mockPlaces[0]}
      onActivate={jest.fn()}
      onBookmarkClick={onBookmarkClick}
    /></StaticRouter>);
    const bookmarkButton = app.find(`.place-card__bookmark-button`);
    bookmarkButton.simulate(`click`);
    expect(onBookmarkClick).toHaveBeenCalledTimes(1);
    expect(onBookmarkClick.mock.calls[0][0]).toBe(mockPlaces[0]);
  });
});


