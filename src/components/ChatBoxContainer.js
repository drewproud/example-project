import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ChatBox from './ChatBox';
import { selectIsUserTyping, selectMessages } from '../store/reducer';
import { onBeginTyping, sendMessage } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  messages: selectMessages(state),
  isOtherUserTyping: selectIsUserTyping(state, ownProps.targetUser.id),
});

const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...ownProps,
  ...stateProps,
  onBeginTyping: () => dispatch(onBeginTyping(ownProps.user.id)),
  onMessageSend: content => dispatch(sendMessage(ownProps.user, ownProps.targetUser, content)),
});

class ChatBoxContainer extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      userId: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
    onMessageSend: PropTypes.func.isRequired,
    onBeginTyping: PropTypes.func.isRequired,
    isOtherUserTyping: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    targetUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const {
      messages,
      isOtherUserTyping,
      user,
      targetUser,
    } = this.props;

    return (
      <ChatBox
        user={ user }
        targetUser={ targetUser }
        messages={ messages }
        onBeginTyping={ this.props.onBeginTyping }
        onMessageSend={ this.props.onMessageSend }
        isOtherUserTyping={ isOtherUserTyping }
      />
    );
  }
}

export default connect(mapStateToProps, null, mergeProps)(ChatBoxContainer);
