import { constRoutes, asyncRoutes } from '@/router/routes';
import { getPerms } from '@/api/login/login';
import { filterRoutes } from '@/utils/util';
import router from '@/router';

/*eslint-disable*/
const permit = {
  state: {
    constRoutes,
    permitRoutes: [],
    perms: []
  },
  getters: {
    permitRoutes: state => state.permitRoutes,
    permsId: state => state.perms.map(val => val.appid.toLowerCase()),
    currentPerm: (state, getters, rootState) => {
      const path = rootState.route.path;
      for (const val of state.perms) {
        if (path.includes(val.appid.toLowerCase())) {
          return val;
        }
      }
    },
    parentPerm: (state, getters, rootState) => {
      const path = rootState.route.from.path;
      if (constRoutes.some(routes => routes.path === path)) {
        return rootState.getters.currentPerm;
      }
      for (const val of state.perms) {
        if (path.includes(val.appid.toLowerCase())) {
          return val;
        }
      }
    }
  },
  mutations: {
    SET_PERMS(state, perms) {
      state.perms = perms;
    },
    SET_PERMITROUTES(state, routes) {
      state.permitRoutes = routes;
    }
  },
  actions: {
    generateRoutes({ commit, getters }) {
      return new Promise((resolve, reject) => {
        getPerms(getters.userId).then((response) => {
          commit('SET_PERMS', response.data);
          const permitRoutes = filterRoutes(getters.permsId, asyncRoutes);
          commit('SET_PERMITROUTES', permitRoutes);
          router.addRoutes(permitRoutes);
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
};

export default permit;
