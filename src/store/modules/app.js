import { fetchMessage } from '@/api/login/message';
import io from 'socket.io-client';
import config from '@/config';
// import Notice from 'iview/src/components/notice';

const app = {
  state: {
    menuIsOpen: true,
    unReadMessage: [],
    totleMessage: 0
  },
  getters: {
    menuIsOpen: state => state.menuIsOpen,
    unReadMessage: state => state.unReadMessage,
    totleMessage: state => state.totleMessage
  },
  mutations: {
    TOGGLE_MENU(state) {
      state.menuIsOpen = !state.menuIsOpen;
    },
    SET_UNREADMSG(state, unReadMsg) {
      state.unReadMessage = unReadMsg;
    },
    SET_TOTALMSG(state, totalMsg) {
      state.totleMessage = totalMsg;
    }
  },
  actions: {
    fetchMsg({
      commit,
      getters
    }) {
      return new Promise(resolve => {
        fetchMessage({
          readState: 0,
          receiveId: getters.userName
        }, 1).then(response => {
          commit('SET_UNREADMSG', response.data.dataSource);
          commit('SET_TOTALMSG', response.data.pageInfo.totalCount);
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
      socket.on('connect', () => {
        console.log('socket connect!');
      });
      socket.on('message', data => {
        console.log(data);
        // Notice.info({
        //   title: data.msgtitle,
        //   desc: data.msgcontent,
        //   onClose() {

        //   }
        // });
      });
      socket.on('disconnect', () => {
        console.log('socket disconnect!');
      });
    }
  }
};

export default app;
