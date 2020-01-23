const initialState = {
  activeCity: null,
};

const ActionType = {
  SET_ACTIVE_CITY: `SET_ACTIVE_CITY`,
};

const ActionCreator = {
  setActiveCity: (city) => ({
    type: ActionType.SET_ACTIVE_CITY,
    payload: city,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CITY: return Object.assign({}, state, {
      activeCity: Object.assign({}, action.payload),
    });
  }
  return state;
};

export {
  ActionType,
  ActionCreator,
  reducer,
};
