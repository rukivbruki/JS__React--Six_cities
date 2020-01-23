import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';
import {getActiveCity} from '../active-city/selectors';
import {calcDistance} from "../../utils/calc-distance";

const NAME_SPACE = NameSpace.OFFERS;

export const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

export const getCities = (state) => {
  return state[NAME_SPACE].cities;
};

export const getIsLoaded = (state) => {
  return state[NAME_SPACE].isLoaded;
};

export const getLoadingError = (state) => {
  return state[NAME_SPACE].loadingError;
};

export const getActiveCityOffers = createSelector(
    [getOffers, getActiveCity],
    (offers, activeCity) => {
      if (!activeCity || !offers) {
        return [];
      }
      return offers.filter((offer) => offer.city.name === activeCity.name);
    }
);

export const getOfferById = (state, id) => {
  const idNumber = Number(id);
  return state[NAME_SPACE].offers && state[NAME_SPACE].offers.find((it) => it.id === idNumber);
};

export const getTreeNearPlaces = (state, place, count) => {
  if (!getIsLoaded(state)) {
    return [];
  }

  return [...getOffers(state)].map((it) => {
    it.distance = calcDistance(place.location.latitude, place.location.longitude,
        it.location.latitude, it.location.longitude);
    return it;
  }).sort((place1, place2) => place1.distance - place2.distance).slice(1, count + 1);
};

