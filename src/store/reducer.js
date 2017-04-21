import { combineReducers } from 'redux';
import R from 'ramda';
import { MESSAGE_SEND_REQUESTED, USER_BEGAN_TYPING, USER_DONE_TYPING } from './actions';

const appendMessage = (userId, content, userName) => R.append({
  userId,
  userName,
  content,
  timestamp: Date.now(),
});

function messages(state = [], action) {
  switch (action.type) {
    case MESSAGE_SEND_REQUESTED:
      return appendMessage(action.userId, action.content, action.userName)(state);
    default:
      return state;
  }
}

export const selectMessages = state => state.messages;

function usersCurrentlyTyping(state = {}, action) {
  switch (action.type) {
    case USER_BEGAN_TYPING:
      return {
        ...state,
        [action.userId]: action.version,
      };
    case USER_DONE_TYPING:
      if (action.version === state[action.userId]) {
        return {
          ...state,
          [action.userId]: null,
        };
      }
      return state;
    case MESSAGE_SEND_REQUESTED:
      return {
        ...state,
        [action.userId]: null,
      };
    default:
      return state;
  }
}

export const selectIsUserTyping = (state, userId) => !!state.usersCurrentlyTyping[userId];

export default combineReducers({
  messages,
  usersCurrentlyTyping,
});
