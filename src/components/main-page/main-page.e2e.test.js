import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MainPage} from './main-page.jsx';
import mockPlaces from '../../mocks/mock-offers.js';
import mockCities from '../../mocks/mock-cities.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import fixContainerLeafletTest from '../../utils/fix-container-leaflet-test';

configure({adapter: new Adapter()});
jest.mock(`../../utils/set-body-root-class`);

it(`When component mount invoke load`, () => {
  fixContainerLeafletTest();
  const load = jest.fn();
  shallow(<MainPage
    places={mockPlaces}
    cities={mockCities}
    activeCity={mockCities[0]}
    activePlace={null}
    isLoaded={false}
    loadingError={null}
    load={load}
    onCityClick={jest.fn()}
    onActivatePlace={jest.fn()}
  />);

  expect(load).toHaveBeenCalledTimes(1);
});

it(`When user click on image invoke onActivatePlace `, () => {
  fixContainerLeafletTest();
  const store = createStore((state) => (state));
  const linkPrevention = jest.fn();
  const onActivatePlace = jest.fn();
  const mainPage = mount(<Provider store={store}>
    <StaticRouter>
      <MainPage
        places={mockPlaces}
        cities={mockCities}
        activeCity={mockCities[0]}
        activePlace={null}
        isLoaded={true}
        loadingError={null}
        load={jest.fn()}
        onCityClick={jest.fn()}
        onActivatePlace={onActivatePlace}/>
    </StaticRouter>
  </Provider>);

  const cardImage = mainPage.find(`.place-card__image-wrapper a`).at(0);
  cardImage.simulate(`click`, {preventDefault: linkPrevention});
  expect(onActivatePlace).toHaveBeenCalledTimes(1);
  expect(onActivatePlace).toHaveBeenCalledWith(mockPlaces[0]);
});

it(`When user click on city invoke onCityClick and onActivatePlace with null`, () => {
  fixContainerLeafletTest();
  const store = createStore((state) => (state));
  const onActivatePlace = jest.fn();
  const onCityClick = jest.fn();
  const mainPage = mount(<Provider store={store}>
    <StaticRouter>
      <MainPage
        places={mockPlaces}
        cities={mockCities}
        activeCity={mockCities[0]}
        activePlace={null}
        isLoaded={true}
        loadingError={null}
        load={jest.fn()}
        onCityClick={onCityClick}
        onActivatePlace={onActivatePlace}/>
    </StaticRouter>
  </Provider>);

  const cityLink = mainPage.find(`.locations__item a`).at(0);
  cityLink.simulate(`click`);
  expect(onCityClick).toHaveBeenCalledTimes(1);
  expect(onActivatePlace).toHaveBeenCalledTimes(1);
  expect(onActivatePlace).toHaveBeenCalledWith(null);
});


