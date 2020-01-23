import {createSelector} from "reselect";
import Constants, {SortType} from "../../constants";
import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.DATA;

const getActiveCity = (state) => {
  return state[NAME_SPACE].currentCity;
};

const getFavorites = (state) => {
  return state[NAME_SPACE].favorites;
};


const getLoadingStatus = (state) => {
  return state[NAME_SPACE].isLoading;
};

const getHoveredOfferId = (state) => {
  return state[NAME_SPACE].activeOffer;
};

const getCoordinates = createSelector(
    (state) => getFilteredOffers(state),
    (coordinates) => coordinates.map((element) => element.location.coordinates)
);

const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

const getReviews = (state, id) => {
  return state[NAME_SPACE].reviews[id];
};

const getCities = createSelector(
    getOffers,
    (offers) => [...new Set(offers.map((item) => item.city.name))].sort()
);

const getTypeSort = (state) => {
  return state[NAME_SPACE].typeSort;
};

const getFilteredOffers = createSelector(
    getOffers,
    getActiveCity,
    (offers, city) => offers.filter((offer) => offer.city.name === city)
);

const getSortedOffers = createSelector(
    getFilteredOffers,
    getTypeSort,
    (offers, sortType) => {
      switch (sortType) {
        case (SortType.TO_HIGH):
          return offers.slice().sort((current, next) => current.price - next.price);
        case (SortType.TO_LOW):
          return offers.slice().sort((current, next) => next.price - current.price);
        case (SortType.TOP_RATED):
          return offers.slice().sort((current, next) => next.rating - current.rating);
        default:
          return offers;
      }
    }
);

const getNearbyOffers = createSelector(
    getOffers,
    getFilteredOffers,
    (offers, filteredOffers) => filteredOffers.slice(0, Constants.MAX_MAP_MARKERS)
);

const getOfferById = (state, id) => {
  const offers = getOffers(state);

  return offers.find((offer) => offer.id === id);
};

const getHoveredOffer = createSelector(
    getOffers,
    getHoveredOfferId,
    (offers, id) => offers.find((item) => item.id === id)
);

const getGroupingFavoritesByCities = createSelector(
    getFavorites,
    (favoriteOffers) => {
      if (favoriteOffers.length === 0) {
        return false;
      }

      const group = {};

      favoriteOffers.forEach((item) => {
        group[item.city.name] = group[item.city.name] || [];
        group[item.city.name].push(item);
      });

      return group;
    }
);

export {
  getActiveCity,
  getCities,
  getFavorites,
  getGroupingFavoritesByCities,
  getCoordinates,
  getFilteredOffers,
  getHoveredOffer,
  getLoadingStatus,
  getNearbyOffers,
  getOfferById,
  getOffers,
  getReviews,
  getSortedOffers,
  getTypeSort,
};
