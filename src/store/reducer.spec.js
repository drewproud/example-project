import { selectMessages, selectIsUserTyping } from './reducer';

describe('selectors', () => {
  describe('selectMessages', () => {
    it('selects the right number of messages', () => {
      expect(selectMessages({ messages: [{}, {}] }).length).toBe(2);
    });
  });

  describe('selectIsUserTyping', () => {
    it('selects true when user is typing', () => {
      const isUserTyping = selectIsUserTyping({ usersCurrentlyTyping: { user1: 1 } }, 'user1');
      expect(isUserTyping).toBe(true);
    });

    it('selects false when user is not typing', () => {
      const isUserTyping = selectIsUserTyping({ usersCurrentlyTyping: { user1: null } }, 'user1');
      expect(isUserTyping).toBe(false);
    });
  });
});
