import MockAdapter from 'axios-mock-adapter';
import mockComments from '../../mocks/mock-comments.json';

import {createAPI} from "../../api";
import {
  ActionType,
  parseComment,
  loadComments,
  sendComment,
  reducer
} from './comments';

const comments = mockComments.map(parseComment);

describe(`Comments end point api works correctly`, () => {
  it(`Should make a correct load comments`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, mockComments);

    return loadComments(1)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.COMMENTS_LOADING,
          payload: {placeId: 1},
        });

        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.COMMENTS_LOADED,
          payload: {placeId: 1, comments},
        });
      });
  });

  it(`Should make a correct fail load comments`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const errorText = `some error text`;
    apiMock
      .onGet(`/comments/1`)
      .reply(400, {error: errorText});

    return loadComments(1)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.COMMENTS_LOADING,
          payload: {placeId: 1},
        });

        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.COMMENTS_LOADING_ERROR,
          payload: {placeId: 1, error: errorText},
        });
      });
  });

  it(`Should make a correct post comment`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    apiMock
      .onPost(`/comments/1`)
      .reply(200, mockComments);

    return sendComment(1, `comment text`)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.COMMENT_SENDING,
        });

        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.COMMENT_SENDED,
        });

        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.COMMENTS_LOADED,
          payload: {placeId: 1, comments},
        });
      });
  });

  it(`Should make a correct fail post comment`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const errorText = `error text`;
    apiMock
      .onPost(`/comments/1`)
      .reply(400, {error: errorText});

    return sendComment(1, `comment text`)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.COMMENT_SENDING,
        });

        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.COMMENT_SENDING_ERROR,
          payload: errorText,
        });
      });
  });
});


describe(`Comments reducer works correctly`, () => {
  it(`Comments reducer without additional parameters should return initial state`, function () {
    expect(reducer(undefined, {})).toEqual({
      comments: [],
      commentSending: false,
      commentSendingError: null,
      commentSended: false,
    });
  });

  it(`Comments reducer set loading comments state`, function () {
    const placeId = 1;
    expect(reducer(undefined, {
      type: ActionType.COMMENTS_LOADING,
      payload: {placeId},
    }).comments).toEqual(expect.arrayContaining([{
      id: placeId,
      isLoading: true,
      loadingError: null,
      isLoaded: false,
      comments: []
    }]));
  });


  it(`Comments reducer save loaded comments to store`, function () {
    const placeId = 1;
    expect(reducer(undefined, {
      type: ActionType.COMMENTS_LOADED,
      payload: {placeId, comments},
    }).comments).toEqual(expect.arrayContaining([{
      id: placeId,
      isLoading: false,
      loadingError: null,
      isLoaded: true,
      comments
    }]));
  });

  it(`Comments reducer save loading error to store`, function () {
    const placeId = 1;
    const error = `some error`;
    expect(reducer(undefined, {
      type: ActionType.COMMENTS_LOADING_ERROR,
      payload: {placeId, error},
    }).comments).toEqual(expect.arrayContaining([{
      id: placeId,
      isLoading: false,
      loadingError: error,
      isLoaded: false,
      comments: []
    }]));
  });

  it(`Comment reducer set sending state`, function () {
    expect(reducer(undefined, {
      type: ActionType.COMMENT_SENDING,
    })).toEqual(expect.objectContaining({
      commentSending: true,
      commentSendingError: null,
      commentSended: false,
    }));
  });

  it(`Comment reducer set sended state`, function () {
    expect(reducer(undefined, {
      type: ActionType.COMMENT_SENDED,
    })).toEqual(expect.objectContaining({
      commentSending: false,
      commentSendingError: null,
      commentSended: true,
    }));
  });

  it(`Comment reducer save sending error to store`, function () {
    const error = `some error`;
    expect(reducer(undefined, {
      type: ActionType.COMMENT_SENDING_ERROR,
      payload: error,
    })).toEqual(expect.objectContaining({
      commentSending: false,
      commentSendingError: error,
      commentSended: false,
    }));
  });
});
