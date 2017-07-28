import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview';
import store from '@/store';
import { constRoutes } from './routes';

Vue.use(Router);

// 路由配置
const routerConfig = {
  // mode: 'history',      // 后端支持重定向到/ 可开
  routes: constRoutes,
  scrollBehavior: () => ({
    y: 0
  })
};

const router = new Router(routerConfig);

const whiteList = constRoutes.filter(routes => routes.path !== '/');

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/');
    } else if (store.getters.permitRoutes.length === 0) {
      store.dispatch('generateRoutes');
      next();
    } else {
      next();
    }
  } else {
    const trust = whiteList.some(route => route.path === to.path);
    if (trust) {
      next();
    } else {
      next('/login');
    }
  }
});

router.afterEach(() => {
  iView.LoadingBar.finish();
});

export default router;
