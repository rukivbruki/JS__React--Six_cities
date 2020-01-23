import userDataAdapter from "../../adapters/user-data-adapter";
import {REQUEST} from "../../constants";

const initialState = {
  isAuthorizationRequired: true,
  userData: {},
};

const Action = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  AUTHORIZATION: `AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: Action.REQUIRED_AUTHORIZATION,
    payload: status
  }),

  authorization: (userData) => ({
    type: Action.AUTHORIZATION,
    payload: userData
  }),
};

const Operation = {
  sendAuthData: (authData) => (dispatch, _, api) => {
    return api.post(`/login`, authData)
      .then(({data}) => {
        dispatch(ActionCreator.authorization(userDataAdapter(data)));
        dispatch(ActionCreator.requireAuthorization(false));
      });
  },

  onCheckAuth: () => (dispatch, _, api) => {
    return api.get(`/login`)
      .then(({status, data}) => {
        if (status === REQUEST.STATUS_CODE.SUCCESS) {
          dispatch(ActionCreator.authorization(userDataAdapter(data)));
          dispatch(ActionCreator.requireAuthorization(false));
        }
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {isAuthorizationRequired: action.payload});
    case Action.AUTHORIZATION:
      return Object.assign({}, state, {userData: action.payload});
  }
  return state;
};

export {ActionCreator, Action, reducer, Operation};
