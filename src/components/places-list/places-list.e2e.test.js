import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlacesList from './places-list.jsx';
import mockPlaces from '../../mocks/mock-offers.js';
import mockCities from '../../mocks/mock-cities.js';
import fixContainerLeafletTest from '../../utils/fix-container-leaflet-test';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';

const mockSortings = [
  {
    name: `Sort 1`,
    sortFunction: null,
  },
  {
    name: `Sort 2`,
    sortFunction: (place1, place2) => place1.price - place2.price,
  },
];

configure({adapter: new Adapter()});

describe(`PlacesList correctly work`, () => {
  it(`When user click on place card invoke onActivatePlace`, () => {
    fixContainerLeafletTest();
    const store = createStore((state) => (state));
    const onActivatePlace = jest.fn();
    const placesList = mount(<Provider store={store}>
      <StaticRouter>
        <PlacesList
          places={mockPlaces}
          city={mockCities[0]}
          activePlace={null}
          isSortOpen={false}
          activeSorting={mockSortings[0]}
          sortings={mockSortings}
          onActivatePlace={onActivatePlace}
          onOpenSortClick={jest.fn()}
          onSortClick={jest.fn()}
        />
      </StaticRouter>
    </Provider>);
    const imageLink = placesList.find(`.place-card__image-wrapper a`).at(0);
    imageLink.simulate(`click`);
    expect(onActivatePlace).toHaveBeenCalledTimes(1);
    expect(onActivatePlace.mock.calls[0][0]).toBe(mockPlaces[0]);
  });

  it(`When user click open sort list invoke onOpenSortClick`, () => {
    fixContainerLeafletTest();
    const store = createStore((state) => (state));
    const onOpenSortClick = jest.fn();
    const placesList = mount(<Provider store={store}>
      <StaticRouter>
        <PlacesList
          places={mockPlaces}
          city={mockCities[0]}
          activePlace={null}
          isSortOpen={false}
          activeSorting={mockSortings[0]}
          sortings={mockSortings}
          onActivatePlace={jest.fn()}
          onOpenSortClick={onOpenSortClick}
          onSortClick={jest.fn()}
        />
      </StaticRouter>
    </Provider>);
    const sortList = placesList.find(`.places__options`);
    sortList.simulate(`click`);
    expect(onOpenSortClick).toHaveBeenCalledTimes(1);
  });

  it(`When user click on sort invoke onSortClick`, () => {
    fixContainerLeafletTest();
    const store = createStore((state) => (state));
    const onSortClick = jest.fn();
    const placesList = mount(<Provider store={store}>
      <StaticRouter>
        <PlacesList
          places={mockPlaces}
          city={mockCities[0]}
          activePlace={null}
          isSortOpen={false}
          activeSorting={mockSortings[0]}
          sortings={mockSortings}
          onActivatePlace={jest.fn()}
          onOpenSortClick={jest.fn()}
          onSortClick={onSortClick}
        />
      </StaticRouter>
    </Provider>);
    const sortOption = placesList.find(`.places__option`).at(1);
    sortOption.simulate(`click`);
    expect(onSortClick).toHaveBeenCalledTimes(1);
    expect(onSortClick.mock.calls[0][0]).toBe(mockSortings[1]);
  });
});

