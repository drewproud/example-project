import { sendMessage, onBeginTyping } from './actions';
import configureStore from './configureStore';
import { selectMessages, selectIsUserTyping } from './reducer';

describe('actions', () => {
  describe('sendMessage', () => {
    it('sends the right number of messages', () => {
      const store = configureStore();
      store.dispatch(sendMessage({ id: 'userId1', name: 'Test User' }, { id: 'userId2', name: 'Test User2' }, 'content'));

      expect(selectMessages(store.getState()).length).toBe(1);
    });

    it('appends the message to the list', () => {
      const store = configureStore();
      store.dispatch(sendMessage({ id: 'userId1', name: 'Test User' }, { id: 'userId2', name: 'Test User2' }, 'content'));
      store.dispatch(sendMessage({ id: 'userId1', name: 'Test User' }, { id: 'userId2', name: 'Test User2' }, 'second message'));
      expect(selectMessages(store.getState()).length).toBe(2);
    });

    it('adds the correct message when sendMessage is called', () => {
      const store = configureStore();
      store.dispatch(sendMessage({ id: 'userId1', name: 'Test User' }, { id: 'userId2', name: 'Test User2' }, 'content'));
      expect(selectMessages(store.getState())[0].content).toBe('content');
    });

    it('adds the correct userId when sendMessage is called', () => {
      const store = configureStore();
      store.dispatch(sendMessage({ id: 'userId1', name: 'Test User' }, { id: 'userId2', name: 'Test User2' }, 'content'));
      expect(selectMessages(store.getState())[0].userId).toBe('userId1');
    });

    it('adds the correct userName when sendMessage is called', () => {
      const store = configureStore();
      store.dispatch(sendMessage({ id: 'userId1', name: 'Test User' }, { id: 'userId2', name: 'Test User2' }, 'content'));
      expect(selectMessages(store.getState())[0].userName).toBe('Test User');
    });
  });

  describe('onBeginTyping', () => {
    it('sets user as typing immediately', () => {
      const store = configureStore();
      store.dispatch(onBeginTyping('user1'));

      expect(selectIsUserTyping(store.getState(), 'user1')).toEqual(true);
    });

    it('does not set other user as typing', () => {
      const store = configureStore();
      store.dispatch(onBeginTyping('user1'));

      expect(selectIsUserTyping(store.getState(), 'user2')).toEqual(false);
    });

    it('resets user to not typing after 3 seconds', () => {
      jest.useFakeTimers();

      const store = configureStore();
      store.dispatch(onBeginTyping('user1'));
      jest.runTimersToTime(3000);

      expect(selectIsUserTyping(store.getState(), 'user1')).toEqual(false);
    });

    it('does not reset user2 after 3 seconds', () => {
      jest.useFakeTimers();

      const store = configureStore();
      store.dispatch(onBeginTyping('user1'));
      jest.runTimersToTime(1000);

      store.dispatch(onBeginTyping('user2'));
      jest.runTimersToTime(1000);

      expect(selectIsUserTyping(store.getState(), 'user2')).toEqual(true);
    });
  });
});
