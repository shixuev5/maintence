import { fetchMessage } from '@/api/login/message';
import io from 'socket.io-client';
import config from '@/config';
import Notice from 'iview/src/components/notice';

const app = {
  state: {
    menuIsOpen: true,
    unReadMessage: []
  },
  getters: {
    menuIsOpen: state => state.menuIsOpen,
    unReadMessage: state => state.unReadMessage
  },
  mutations: {
    TOGGLE_MENU(state) {
      state.menuIsOpen = !state.menuIsOpen;
    },
    SET_MSG(state, message) {
      state.unReadMessage = message;
    }
  },
  actions: {
    fetchMsg({ commit }) {
      return new Promise((resolve) => {
        fetchMessage().then((response) => {
          response.data = response.data || [];
          commit('SET_MSG', response.data);
          resolve();
        });
      });
    },
    connectSocket({ getters }) {
      const socket = io(config.socket, {
        query: {
          userid: getters.userName
        }
      });
      socket.on('connect', () => {
        console.log('socket connect!');
      });
      socket.on('message', (data) => {
        Notice.info({
          title: data.msgtitle,
          desc: data.msgcontent,
          onClose() {

          }
        });
      });
      socket.on('disconnect', () => {
        console.log('socket disconnect!');
      });
    }
  }
};

export default app;
