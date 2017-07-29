import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import { Tree } from 'element-ui';
import VueBar from 'vuebar';
import router from '@/router';
import store from '@/store';
import { sync } from 'vuex-router-sync';
import filters from '@/filters'; // 全局vue filter

import App from '@/App';
import '@/style/index.less';   // 全局覆盖iview样式
import '@/style/scrollbar.less';

Vue.use(VueBar);
Vue.use(iView);
Vue.use(Tree);


sync(store, router);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
Vue.prototype.$log = console.log.bind(console);

/*eslint-disable*/
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

