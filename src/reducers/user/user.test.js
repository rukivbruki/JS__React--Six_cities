import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {
  ActionType,
  authorizeUser,
  parseAuthorizationData,
  reducer
} from "./user";

describe(`Reducer works correctly`, () => {
  it(`Should make a correct user authorization`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const mockData = {};

    apiMock
      .onPost(`/login`)
      .reply(200, mockData);

    return authorizeUser(`email`, `password`)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.SET_AUTHORIZATION_ERROR,
          payload: null,
        });

        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.SET_AUTHORIZATION_DATA,
          payload: parseAuthorizationData(mockData),
        });

        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.SET_AUTHORIZATED,
          payload: true,
        });
      });
  });

  it(`Data reducer without additional parameters should return initial state`, function () {
    expect(reducer(undefined, {})).toEqual({
      isAuthorazated: false,
      authorizationData: null,
      authorizationError: null,
    });
  });

  it(`Reducer should save authorazation state to store`, function () {
    expect(reducer(undefined, {
      type: ActionType.SET_AUTHORIZATED,
      payload: true,
    }).isAuthorazated).toEqual(true);
  });

  it(`Reducer should save user data to store`, function () {
    const authorizationData = {ename: `email`};
    expect(reducer(undefined, {
      type: ActionType.SET_AUTHORIZATION_DATA,
      payload: authorizationData,
    }).authorizationData).toEqual(authorizationData);
  });

  it(`Reducer should save authorazation error to store`, function () {
    const authorizationError = {error: `error text`};
    expect(reducer(undefined, {
      type: ActionType.SET_AUTHORIZATION_ERROR,
      payload: authorizationError,
    }).authorizationError).toEqual(authorizationError);
  });

});
