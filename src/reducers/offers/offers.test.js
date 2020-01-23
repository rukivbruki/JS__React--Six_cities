import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import mockOffers from '../../mocks/mock-offers.json';
import parseOffer from '../../utils/parse-offer';

import {
  ActionType,
  loadOffers,
  getCitiesFromOffers,
  reducer
} from "./offers";

import {
  ActionType as ActiveCityActionType
} from "../active-city/active-city";

const offers = mockOffers.map(parseOffer);
const cities = getCitiesFromOffers(offers);

describe(`Offers end point api works correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet(`/hotels`)
      .reply(200, mockOffers);

    return loadOffers()(dispatch, () => ({}), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.OFFERS_LOAD,
        });

        expect(dispatch.mock.calls[1][0].type).toEqual(
            ActiveCityActionType.SET_ACTIVE_CITY);

        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.OFFERS_LOADED,
          payload: {offers, cities},
        });
      });
  });
});

describe(`Offers reducer works correctly`, () => {
  it(`Offers reducer without additional parameters should return initial state`, function () {
    expect(reducer(undefined, {})).toEqual({
      isLoaded: false,
      loadingError: null,
      offers: null,
      cities: null,
    });
  });

  it(`Reducer should set offers loading state`, function () {
    expect(reducer(undefined, {
      type: ActionType.OFFERS_LOAD,
    })).toEqual(expect.objectContaining({
      isLoaded: false,
      loadingError: null,
    }));
  });

  it(`Reducer should save loading error to store`, function () {
    const mockError = `some error text`;
    expect(reducer(undefined, {
      type: ActionType.OFFERS_LOADING_ERROR,
      payload: mockError,
    })).toEqual(expect.objectContaining({
      isLoaded: false,
      loadingError: mockError,
    }));
  });

  it(`Reducer should save offers and cities to store and save flags`, function () {
    expect(reducer(undefined, {
      type: ActionType.OFFERS_LOADED,
      payload: {offers, cities},
    })).toEqual(expect.objectContaining({
      isLoaded: true,
      loadingError: null,
      offers,
      cities,
    }));

  });

  it(`Reducer should update offer in store`, function () {
    const newOffer = Object.assign({}, offers[0], {title: `Edited title`});
    expect(reducer({offers}, {
      type: ActionType.OFFERS_UPDATE_OFFER,
      payload: newOffer,
    }).offers[0]).toEqual(newOffer);
  });
});

it(`Test get cities from offers`, function () {
  expect(getCitiesFromOffers(offers)).toEqual(
      [offers[0].city, offers[1].city]
  );
});
