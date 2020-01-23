import {Action, reducer} from "./user";

describe(`User reducer work correct`, () => {
  it(`User reducer should correct change auth`, () => {
    const mockState = {
      isAuthorizationRequired: false,
    };
    const mockAction = (status) => ({
      type: Action.REQUIRED_AUTHORIZATION,
      payload: status
    });

    const reducerWithTrue = reducer(mockState, mockAction(true));
    const reducerWithFalse = reducer(mockState, mockAction(false));

    expect(reducerWithTrue).toEqual({isAuthorizationRequired: true});
    expect(reducerWithFalse).toEqual({isAuthorizationRequired: false});
  });
});
