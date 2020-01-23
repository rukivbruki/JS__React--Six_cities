import {ActionCreator, reducer} from "./active-city";

const mockCity = {
  name: `city 1`,
  location: {
    latitude: 1,
    longitude: 2,
    zoom: 3,
  },
};

describe(`Action creators work correctly`, () => {
  it(`Action creator for set active city`, () => {

    expect(ActionCreator.setActiveCity(mockCity)).toEqual({
      type: `SET_ACTIVE_CITY`,
      payload: mockCity,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeCity: null,
    });
  });

  it(`Reducer should set active city`, () => {
    expect(reducer(null, {
      type: `SET_ACTIVE_CITY`,
      payload: mockCity,
    }).activeCity).toEqual(mockCity);
  });
});
