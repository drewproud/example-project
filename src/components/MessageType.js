import { PropTypes } from 'react';

const MessageType = PropTypes.shape({
  userId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
});

export default MessageType;
