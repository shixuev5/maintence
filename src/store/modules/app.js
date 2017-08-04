import {
  fetchMessage
} from '@/api/manager/messageCenter';
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
    unReadMessage: state => state.unReadMessage,
    totleMessage: state => state.unReadMessage.length
  },
  mutations: {
    TOGGLE_MENU(state) {
      state.menuIsOpen = !state.menuIsOpen;
    },
    SET_UNREADMSG(state, unReadMsg) {
      state.unReadMessage = unReadMsg;
    }
  },
  actions: {
    fetchMsg({
      commit
    }) {
      return new Promise(resolve => {
        fetchMessage({
          readState: 0
        }).then(response => {
          commit('SET_UNREADMSG', response.data.dataSource);
          resolve();
        });
      });
    },
    connectSocket({
      getters
    }) {
      const socket = io(config.socket, {
        query: {
          userid: getters.userName
        }
      });
      socket.on('reconnect_attempt', () => {
        socket.io.opts.query = {
          userid: getters.userName
        };
      });
      socket.on('notification', data => {
        const noticeInfo = JSON.parse(data);
        Notice.info({
          title: noticeInfo.title,
          desc: noticeInfo.content,
          onClose() {

          }
        });
      });
    }
  }
};

export default app;
