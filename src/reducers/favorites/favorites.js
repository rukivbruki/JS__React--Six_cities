import parseOffer from '../../utils/parse-offer';
import {ActionCreator as OffersActionCreator} from '../offers/offers';

const initialState = {
  isLoaded: false,
  loadingError: null,
  favorites: null,
};

const ActionType = {
  FAVORITES_LOADING: `LOAD_FAVORITES`,
  FAVORITES_LOADING_ERROR: `FAVORITES_LOADING_ERROR`,
  FAVORITES_LOADED: `FAVORITES_LOADED`,
  FAVORITES_REMOVE: `FAVORITES_REMOVE`,
};

const ActionCreator = {
  loadFavorites: () => ({
    type: ActionType.FAVORITES_LOADING,
  }),

  loadingFavoritesError: (error) => ({
    type: ActionType.FAVORITES_LOADING_ERROR,
    payload: error,
  }),

  loadedFavorites: (favorites) => ({
    type: ActionType.FAVORITES_LOADED,
    payload: favorites,
  }),

  removeFromFavorites: (place) => ({
    type: ActionType.FAVORITES_REMOVE,
    payload: place,
  }),
};

const loadFavorites = () => (dispatch, _getState, api) => {
  dispatch(ActionCreator.loadFavorites());
  return api.get(`/favorite`)
    .then((response) => {
      const favorites = response.data.map((offer) => parseOffer(offer));
      dispatch(ActionCreator.loadedFavorites(favorites));
    })
    .catch(() => {
      dispatch(ActionCreator.loadingFavoritesError());
    });
};

const changeFavorites = (place) => (dispatch, _getState, api) => {
  const id = place.id;
  const status = place.isFavorite ? `0` : `1`;
  return api.post(`/favorite/${id}/${status}`)
    .then((response) => {
      const offer = parseOffer(response.data);
      dispatch(OffersActionCreator.updateOffer(offer));
    })
    .catch(() => {
    });
};

const removeFromFavorites = (place) => (dispatch, _getState, api) => {
  return api.post(`/favorite/${place.id}/0`)
    .then((response) => {
      const offer = parseOffer(response.data);
      dispatch(ActionCreator.removeFromFavorites(offer));
    })
    .catch(() => {
    });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FAVORITES_LOADING: return Object.assign({}, state, {
      isLoaded: false,
      loadingError: null,
    });

    case ActionType.FAVORITES_LOADED: return Object.assign({}, state, {
      isLoaded: true,
      loadingError: null,
      favorites: action.payload,
    });

    case ActionType.FAVORITES_LOADING_ERROR: return Object.assign({}, state, {
      isLoaded: false,
      loadingError: action.payload,
    });

    case ActionType.FAVORITES_REMOVE: return Object.assign({}, state, {
      favorites: state.favorites.filter((it) => it.id !== action.payload.id),
    });
  }
  return state;
};

export {
  ActionType,
  ActionCreator,
  reducer,
  loadFavorites,
  removeFromFavorites,
  changeFavorites,
};


