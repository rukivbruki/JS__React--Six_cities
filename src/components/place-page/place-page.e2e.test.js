import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {PlacePage} from './place-page.jsx';
import mockPlaces from '../../mocks/mock-offers.js';

configure({adapter: new Adapter()});
jest.mock(`../../utils/set-body-root-class`);

describe(`PlacePage correctly work`, () => {
  it(`When mount placepage call load`, () => {
    const load = jest.fn();
    shallow(<PlacePage
      isLoaded={false}
      isAuthorazated={false}
      load={load}
      onBookmarkClick={jest.fn()}
      nearPlaces={[mockPlaces[1], mockPlaces[1], mockPlaces[1]]}
      place={mockPlaces[0]}
    />);
    expect(load).toHaveBeenCalledTimes(1);
  });

  it(`When user click on bookmark button invoked onBookmarkClick`, () => {
    const onBookmarkClick = jest.fn();
    const placePage = shallow(<PlacePage
      isLoaded={true}
      isAuthorazated={false}
      load={jest.fn()}
      onBookmarkClick={onBookmarkClick}
      nearPlaces={[mockPlaces[1], mockPlaces[1], mockPlaces[1]]}
      place={mockPlaces[0]}
    />);
    const bookmarkButton = placePage.find(`.property__bookmark-button`);
    bookmarkButton.simulate(`click`);
    expect(onBookmarkClick).toHaveBeenCalledTimes(1);
  });
});

