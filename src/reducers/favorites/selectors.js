import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';
const NAME_SPACE = NameSpace.FAVORITES;

export const getIsLoaded = (state) => {
  return state[NAME_SPACE].isLoaded;
};

export const getLoadingError = (state) => {
  return state[NAME_SPACE].loadingError;
};

export const getFavorites = (state) => {
  return state[NAME_SPACE].favorites;
};

export const getOrderedFavorites = createSelector(
    [getFavorites],
    (favorites) => {
      if (!favorites) {
        return null;
      }

      const orderedFavorites = [];

      for (const offer of favorites) {
        const cityName = offer.city.name;
        let city = orderedFavorites.find((it) => it.city.name === cityName);
        if (city) {
          city.offers.push(offer);
        } else {
          orderedFavorites.push({
            city: offer.city,
            offers: [offer],
          });
        }
      }

      return orderedFavorites;
    }
);
