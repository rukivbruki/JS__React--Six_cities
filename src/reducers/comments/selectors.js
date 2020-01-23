import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.COMMENTS;

export const getCommentsForPlace = (state, placeId) => {
  return state[NAME_SPACE].comments && state[NAME_SPACE].comments.find((it) => it.id === placeId);
};

export const getIsSending = (state) => {
  return state[NAME_SPACE].commentSending;
};

export const getSendingError = (state) => {
  return state[NAME_SPACE].commentSendingError;
};
