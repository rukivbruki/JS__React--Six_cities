import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.ACTIVE_CITY;

export const getActiveCity = (state) => {
  return state[NAME_SPACE] && state[NAME_SPACE].activeCity;
};
