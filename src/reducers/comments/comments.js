const initialState = {
  comments: [],
  commentSending: false,
  commentSendingError: null,
  commentSended: false,
};

const ActionType = {
  COMMENTS_LOADING: `COMMENTS_LOADING`,
  COMMENTS_LOADED: `COMMENTS_LOADED`,
  COMMENTS_LOADING_ERROR: `COMMENTS_LOADING_ERROR`,
  COMMENT_SENDING: `COMMENTS_SENDING`,
  COMMENT_SENDED: `COMMENTS_SENDED`,
  COMMENT_SENDING_ERROR: `COMMENTS_SENDING_ERROR`
};

const ActionCreator = {
  loadingComments: (placeId) => ({
    type: ActionType.COMMENTS_LOADING,
    payload: {placeId},
  }),

  loadedComments: (placeId, comments) => ({
    type: ActionType.COMMENTS_LOADED,
    payload: {placeId, comments},
  }),

  loadingCommentsError: (placeId, error) => ({
    type: ActionType.COMMENTS_LOADING_ERROR,
    payload: {placeId, error},
  }),

  commentSending: () => ({
    type: ActionType.COMMENT_SENDING,
  }),

  commentSended: () => ({
    type: ActionType.COMMENT_SENDED,
  }),

  commentSendingError: (error) => ({
    type: ActionType.COMMENT_SENDING_ERROR,
    payload: error,
  }),
};

const parseComment = (data) => ({
  id: data.id,
  user: {
    id: data.user.id,
    isPro: data.user.is_pro,
    name: data.user.name,
    avatarUrl: data.user.avatar_url,
  },
  rating: Number(data.rating),
  comment: data.comment,
  date: data.date,
});

const loadComments = (placeId) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.loadingComments(placeId));
  return api.get(`/comments/${placeId}`)
    .then((response) => {
      const comments = response.data.map(parseComment);
      dispatch(ActionCreator.loadedComments(placeId, comments));
    })
    .catch((error) => {
      let errorString = `Loading comments error :(`;
      if (error.response && error.response.data && error.response.data.error) {
        errorString = error.response.data.error;
      }
      dispatch(ActionCreator.loadingCommentsError(placeId, errorString));
    });
};

const sendComment = (placeId, comment) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.commentSending());
  return api.post(`/comments/${placeId}`, comment)
    .then((response) => {
      const comments = response.data.map(parseComment);
      dispatch(ActionCreator.commentSended());
      dispatch(ActionCreator.loadedComments(placeId, comments));
    })
    .catch((error) => {
      let errorString = `Send review error!`;
      if (error.response && error.response.data && error.response.data.error) {
        errorString = error.response.data.error;
      }
      dispatch(ActionCreator.commentSendingError(errorString));
    });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.COMMENTS_LOADING:
      if (!state.comments.find((it) => it.id === action.payload.placeId)) {
        return Object.assign({}, state, {
          comments: [...state.comments, {
            id: action.payload.placeId,
            isLoading: true,
            loadingError: null,
            isLoaded: false,
            comments: []
          }],
        });
      }
      return Object.assign({}, state, {
        comments: state.comments.map((it) => {
          if (it.id === action.payload.placeId) {
            return Object.assign({}, it, {
              isLoading: true,
              loadingError: null,
            });
          }
          return it;
        })
      });

    case ActionType.COMMENTS_LOADED:
      if (!state.comments.find((it) => it.id === action.payload.placeId)) {
        return Object.assign({}, state, {
          comments: [...state.comments, {
            id: action.payload.placeId,
            isLoading: false,
            loadingError: null,
            isLoaded: true,
            comments: action.payload.comments,
          }],
        });
      }
      return Object.assign({}, state, {
        comments: state.comments.map((it) => {
          if (it.id === action.payload.placeId) {
            return Object.assign({}, it, {
              id: action.payload.placeId,
              isLoading: false,
              loadingError: null,
              isLoaded: true,
              comments: action.payload.comments
            });
          }
          return it;
        })
      });

    case ActionType.COMMENTS_LOADING_ERROR:
      if (!state.comments.find((it) => it.id === action.payload.placeId)) {
        return Object.assign({}, state, {
          comments: [...state.comments, {
            id: action.payload.placeId,
            isLoading: false,
            loadingError: action.payload.error,
            isLoaded: false,
            comments: [],
          }],
        });
      }
      return Object.assign({}, state, {
        comments: state.comments.map((it) => {
          if (it.id === action.payload.placeId) {
            return Object.assign({}, it, {
              isLoading: false,
              loadingError: action.payload,
            });
          }
          return it;
        })
      });

    case ActionType.COMMENT_SENDING:
      return Object.assign({}, state, {
        commentSending: true,
        commentSendingError: null,
        commentSended: false,
      });

    case ActionType.COMMENT_SENDED:
      return Object.assign({}, state, {
        commentSending: false,
        commentSendingError: null,
        commentSended: true,
      });

    case ActionType.COMMENT_SENDING_ERROR:
      return Object.assign({}, state, {
        commentSending: false,
        commentSendingError: action.payload,
        commentSended: false,
      });
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  parseComment,
  loadComments,
  sendComment,
  reducer,
};
