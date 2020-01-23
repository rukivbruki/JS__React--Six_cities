import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isAuthorazated;
};

export const getAuthorizationData = (state) => {
  return state[NAME_SPACE].authorizationData;
};

export const getAuthorizationError = (state) => {
  return state[NAME_SPACE].authorizationError && state[NAME_SPACE].authorizationError.error;
};
