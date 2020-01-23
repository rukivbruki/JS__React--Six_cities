import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import mockOffers from '../../mocks/mock-offers.json';
import parseOffer from '../../utils/parse-offer';
import {ActionType as OffersActionType} from '../offers/offers';
import {
  ActionType,
  loadFavorites,
  changeFavorites,
  reducer
} from "./favorites";

const offers = mockOffers.map(parseOffer);

describe(`Favorites end point api works correctly`, () => {
  it(`Should make a correct API call to /favorite`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet(`/favorite`)
      .reply(200, mockOffers);

    return loadFavorites()(dispatch, () => ({}), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.FAVORITES_LOADING,
        });

        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.FAVORITES_LOADED,
          payload: offers
        });
      });
  });

  it(`Should make a correct API call to change favotite state`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    apiMock
      .onPost(`/favorite/${offers[0].id}/${offers[0].isFavorite ? `0` : `1`}`)
      .reply(200, mockOffers[0]);

    return changeFavorites(offers[0])(dispatch, () => ({}), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: OffersActionType.OFFERS_UPDATE_OFFER,
          payload: offers[0]
        });
      });
  });
});

describe(`Favorites reducer works correctly`, () => {
  it(`Favorites reducer without additional parameters should return initial state`, function () {
    expect(reducer(undefined, {})).toEqual({
      isLoaded: false,
      loadingError: null,
      favorites: null,
    });
  });

  it(`Favorites reducer set loading state in store`, function () {
    expect(reducer(undefined, {
      type: ActionType.FAVORITES_LOADING
    })).toEqual(expect.objectContaining({
      isLoaded: false,
      loadingError: null,
    }));
  });

  it(`Favorites reducer save favorites to store`, function () {
    expect(reducer(undefined, {
      type: ActionType.FAVORITES_LOADED,
      payload: offers
    })).toEqual(expect.objectContaining({
      isLoaded: true,
      loadingError: null,
      favorites: offers,
    }));
  });

  it(`Favorites reducer save loading error to store`, function () {
    const error = `some error`;
    expect(reducer(undefined, {
      type: ActionType.FAVORITES_LOADING_ERROR,
      payload: error
    })).toEqual(expect.objectContaining({
      isLoaded: false,
      loadingError: error,
    }));
  });

  it(`Favorites reducer remove offer from favorites`, function () {
    expect(reducer({favorites: [...offers]}, {
      type: ActionType.FAVORITES_REMOVE,
      payload: offers[0]
    }).favorites).toEqual(offers.filter((it) => it.id !== offers[0].id));
  });
});
