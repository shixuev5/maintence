import { login } from '@/api/login/login';
import Cookie from 'js-cookie';

const user = {
  state: {
    userInfo: Cookie.getJSON('token') || {},
    token: Cookie.get('token') || ''
  },
  getters: {
    userId: state => state.userInfo.id,
    userName: state => state.userInfo.name,
    user: state => state.userInfo,
    token: state => state.token
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    SET_IMGURI(state, imguri) {
      state.user.imguri = imguri;
    }
  },
  actions: {
    loginByName({ commit, dispatch }, { name, password }) {
      return new Promise((resolve) => {
        login(name, password).then((response) => {
          // if(response.data.flag !== 1) {
          //     reject('NAMEFAILURE');
          // }else if(response.data.permtype > 1) {
          //     reject('NOPERMIT');
          // }
          commit('SET_USERINFO', response.data);
          response.data.token = response.headers.token;
          Cookie.set('token', response.data, {
            expires: 1
          });
          commit('SET_TOKEN', JSON.stringify(response.data));
          resolve();
        });
      });
    },
    logOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        Cookie.remove('token', {
          path: ''
        });
        resolve();
      });
    }
  }
};

export default user;
