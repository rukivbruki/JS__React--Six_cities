import MockAdapter from "axios-mock-adapter";
import createApi from "./../../api";
import {Action, Operation, reducer, RequestUrl} from "./data";
import {REQUEST} from "../../constants";

describe(`Data reducer work correct`, () => {
  it(`Data reducer should correct change city`, () => {
    const reducerDone = reducer(
        {currentCity: `Dusseldorf`, offers: []},
        {type: `CHANGE_CITY`, payload: `Amsterdam`}
    );

    expect(reducerDone).toEqual({currentCity: `Amsterdam`, offers: []});
  });

  it(`Should make a correct API call to /hotels`, function () {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = Operation.loadOffers();
    const mockOffers = [
      {
        city: {
          name: `Paris`
        }
      },
      {
        city: {
          name: `Moscow`
        }
      },
      {
        city: {
          name: `Paris`
        }
      }
    ];

    apiMock
      .onGet(RequestUrl.HOTELS)
      .reply(REQUEST.STATUS_CODE.SUCCESS, mockOffers);

    return offersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: Action.CHANGE_OFFERS,
          payload: mockOffers,
        });
      });
  });
});

