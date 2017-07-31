<template>
  <div>
    <Menu theme="dark" mode="horizontal">
      <div class="layout-logo">
        <img src="/static/img/title.png" alt="logo">
      </div>
      <User></User>
      <Msg></Msg>
    </Menu>
    <SideBar @toggleClick="toggleClick" :iconSize="iconSize" :menuIsOpen="menuIsOpen"></SideBar>
    <div class="main" :class="{'menu-close': !menuIsOpen}">
      <BreadCrumb class="layout-breadcrumb"></BreadCrumb>
      <div class="layout-content">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import SideBar from './sidebar';
import BreadCrumb from './breadcrumb';
import Msg from './message';
import User from './userinfo';

export default {
  name: 'Layout',
  components: {
    SideBar,
    BreadCrumb,
    Msg,
    User
  },
  computed: {
    iconSize() {
      return this.menuIsOpen ? 18 : 20;
    },
    menuIsOpen() {
      return this.$store.getters.menuIsOpen;
    }
  },
  methods: {
    toggleClick() {
      this.$nextTick(() => {
        window.dispatchEvent(new Event('resize'));
      });
      this.$store.commit('TOGGLE_MENU');
    }
  },
  created() {
    this.$store.dispatch('connectSocket');
  }
};
</script>
<style lang="less" scoped>
@breadcrumb: #e9eaec;
@content: #f8f8f9;

.layout-logo {
  height: 60px;
  margin-left: 10px;
  float: left;
}

.main {
  margin-left: 180px;
  height: calc(~"100vh - 60px"); 
  // transition: margin-left .3s ease-out;
  &.menu-close {
    margin-left: 60px;
  }

  .layout-breadcrumb {
    padding: 10px 15px;
    background: @breadcrumb;
  }

  .layout-content {
    padding: 24px 16px;
    height: calc(~"100% - 34px");
    background: @content;
  }
}
</style>
