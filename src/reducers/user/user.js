import {loadOffers} from "../offers/offers";

const initialState = {
  isAuthorazated: false,
  authorizationData: null,
  authorizationError: null,
};

const ActionType = {
  SET_AUTHORIZATED: `SET_AUTHORIZATED`,
  SET_AUTHORIZATION_DATA: `SET_AUTHORIZATION_DATA`,
  SET_AUTHORIZATION_ERROR: `SET_AUTHORIZATION_ERROR`,
};

const ActionCreator = {
  setAuthorizated: (status) => {
    return {
      type: ActionType.SET_AUTHORIZATED,
      payload: status,
    };
  },

  setAuthorizationData: (data) => {
    return {
      type: ActionType.SET_AUTHORIZATION_DATA,
      payload: data,
    };
  },

  setAuthorizationError: (error) => {
    return {
      type: ActionType.SET_AUTHORIZATION_ERROR,
      payload: error,
    };
  }
};

const parseAuthorizationData = (data) => ({
  id: data.id,
  email: data.email,
  name: data.name,
  avatarUrl: data.avatar_url,
  isPro: data.isPro,
});

const authorizeUser = (email, password) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.setAuthorizationError(null));

  return api.post(`/login`, {email, password})
    .then((response) => {
      const data = parseAuthorizationData(response.data);
      dispatch(ActionCreator.setAuthorizationData(data));
      dispatch(ActionCreator.setAuthorizated(true));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(ActionCreator.setAuthorizationError(error.response.data));
      }
    });
};

const unauthorizeUser = (dispatch, _getState, api) => {
  api.get(`/logout`)
    .finally(() => {
      dispatch(ActionCreator.setAuthorizated(false));
      dispatch(ActionCreator.setAuthorizationData(null));
      dispatch(loadOffers());
    });
};

const loadAuthorizationData = (dispatch, _getState, api) => {
  return api.get(`/login`)
    .then((response) => {
      const data = parseAuthorizationData(response.data);
      dispatch(ActionCreator.setAuthorizationData(data));
      dispatch(ActionCreator.setAuthorizated(true));
    })
    .catch(() => {
      dispatch(ActionCreator.setAuthorizated(false));
    });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATED:
      return Object.assign({}, state, {
        isAuthorazated: action.payload,
      });
    case ActionType.SET_AUTHORIZATION_DATA:
      return Object.assign({}, state, {
        authorizationData: action.payload,
      });
    case ActionType.SET_AUTHORIZATION_ERROR:
      return Object.assign({}, state, {
        authorizationError: action.payload,
      });
  }

  return state;
};

export {
  ActionType,
  ActionCreator,
  reducer,
  authorizeUser,
  unauthorizeUser,
  loadAuthorizationData,
  parseAuthorizationData,
};
