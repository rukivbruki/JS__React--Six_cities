import {ActionCreator as ActiveCityActionCreator} from '../active-city/active-city';
import parseOffer from '../../utils/parse-offer';
import {getActiveCity} from '../active-city/selectors';

const CITIES_COUNT = 6;

const initialState = {
  isLoaded: false,
  loadingError: null,
  offers: null,
  cities: null,
};

const ActionType = {
  OFFERS_LOAD: `OFFERS_LOAD`,
  OFFERS_LOADING_ERROR: `OFFERS_LOADING_ERROR`,
  OFFERS_LOADED: `OFFERS_LOADED`,
  OFFERS_UPDATE_OFFER: `OFFERS_UPDATE_OFFER`,
};

const ActionCreator = {
  loadOffers: () => ({
    type: ActionType.OFFERS_LOAD,
  }),

  loadingOffersError: (error) => ({
    type: ActionType.OFFERS_LOADING_ERROR,
    payload: error,
  }),

  loadedOffers: (offers, cities) => ({
    type: ActionType.OFFERS_LOADED,
    payload: {offers, cities}
  }),

  updateOffer: (offer) => ({
    type: ActionType.OFFERS_UPDATE_OFFER,
    payload: offer,
  }),
};

const getCitiesFromOffers = (offers) => {
  const cities = [];
  const map = new Map();
  for (const offer of offers) {
    if (!map.has(offer.city.name)) {
      map.set(offer.city.name, true);
      cities.push(offer.city);
    }
  }
  return cities.slice(0, CITIES_COUNT);
};

const loadOffers = () => (dispatch, getState, api) => {
  dispatch(ActionCreator.loadOffers());
  return api.get(`/hotels`)
    .then((response) => {
      const offers = response.data.map((it) => parseOffer(it));
      const cities = getCitiesFromOffers(offers);
      if (!getActiveCity(getState())) {
        const activeCity = cities[Math.floor(Math.random() * cities.length)];
        dispatch(ActiveCityActionCreator.setActiveCity(activeCity));
      }
      dispatch(ActionCreator.loadedOffers(offers, cities));
    })
    .catch((error) => {
      let errorString = `Loading comments error :(`;
      if (error.response && error.response.data && error.response.data.error) {
        errorString = error.response.data.error;
      }
      dispatch(ActionCreator.loadingOffersError(errorString));
    });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.OFFERS_LOAD:
      return Object.assign({}, state, {
        isLoaded: false,
        loadingError: null,
      });

    case ActionType.OFFERS_LOADING_ERROR:
      return Object.assign({}, state, {
        isLoaded: false,
        loadingError: action.payload,
      });

    case ActionType.OFFERS_LOADED:
      return Object.assign({}, state, {
        isLoaded: true,
        loadingError: null,
        offers: action.payload.offers,
        cities: action.payload.cities,
      });

    case ActionType.OFFERS_UPDATE_OFFER:
      return Object.assign({}, state, {
        offers: state.offers.map((offer) => {
          if (offer.id === action.payload.id) {
            return action.payload;
          }
          return offer;
        })
      });
  }

  return state;
};

export {
  getCitiesFromOffers,
  ActionCreator,
  ActionType,
  loadOffers,
  reducer,
};
