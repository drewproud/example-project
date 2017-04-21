export const MESSAGE_SEND_REQUESTED = 'messages/MESSAGE_SEND_REQUESTED';
export const USER_BEGAN_TYPING = 'messages/USER_BEGAN_TYPING';
export const USER_DONE_TYPING = 'messages/USER_DONE_TYPING';

export function sendMessage(user, targetUser, content) {
  return (dispatch) => {
    dispatch({
      type: MESSAGE_SEND_REQUESTED,
      userId: user.id,
      userName: user.name,
      targetUserId: targetUser.id,
      content,
    });
    return Promise.resolve();
  };
}

function doneTyping(userId, version) {
  return {
    type: USER_DONE_TYPING,
    version,
    userId,
  };
}

const IS_TYPING_DELAY_IN_MS = 2000;

export function onBeginTyping(userId) {
  return (dispatch) => {
    const version = setTimeout(() => {
      dispatch(doneTyping(userId, version));
    }, IS_TYPING_DELAY_IN_MS);

    return dispatch({
      type: USER_BEGAN_TYPING,
      version,
      userId,
    });
  };
}
