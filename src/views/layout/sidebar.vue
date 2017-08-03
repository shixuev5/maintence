<template>
  <div class="side-bar" :class="{'menu-close': !menuIsOpen}">
    <div class="toggle-button">
      <i-button :class="{'vertical-button': !menuIsOpen}" type="text" size="small" @click="toggleClick">
        <Icon type="navicon" size="26"></Icon>
      </i-button>
    </div>
    <Menu :active-name="this.$route.name" @on-select="select" @on-open-change="change" theme="dark" accordion width="auto">
      <Submenu v-for="routes in permitRoutes" :key="routes.name" :name="routes.name">
        <template slot="title">
          <SideBarItem :route="routes" :menuIsOpen="menuIsOpen" :iconSize="iconSize"></SideBarItem>
        </template>
        <div class="menu-wrap">
        <Menu-item v-if="!route.children" v-for="route in routes.children" :key="route.name" :name="route.name">
          <SideBarItem :route="route" :menuIsOpen="menuIsOpen" :iconSize="itemIconSize"></SideBarItem>
        </Menu-item>
        <Menu-group v-else :title="route.name">
          <Menu-item v-for="child in route.children" :key="child.name" :name="child.name">
            <SideBarItem :route="child" :menuIsOpen="menuIsOpen" :iconSize="itemIconSize"></SideBarItem>
          </Menu-item>
        </Menu-group>
        </div>
      </Submenu>
    </Menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import SideBarItem from './sideBarItem';

export default {
  name: 'SideBar',
  components: {
    SideBarItem
  },
  props: {
    iconSize: {
      type: Number,
      require: true
    },
    menuIsOpen: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    itemIconSize() {
      return this.iconSize - 1;
    },
    ...mapGetters([
      'permitRoutes'
    ])
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick');
    },
    select(name) {
      this.$router.push({
        name,
        query: {
          t: Date.now()
        }
      });
    },
    change(nameArr) {
      this.$router.push({ name: nameArr[0] });
    }
  }
};
</script>
<style lang="less">
@sidebar: #363e4f;

.side-bar {
  position: absolute;
  top: 60px;
  bottom: 0px;
  left: 0px;
  width: 180px; // transition: width .3s ease-out;
  background: @sidebar;

  .ivu-menu-submenu-title>div {
    display: inline-block;
  }

  .menu-wrap {
    // max-height: calc(~"100vh - 458px");
    overflow-y: auto;
  }

  .route-name {
    margin-left: 6px;
  }

  .ivu-menu-submenu li.ivu-menu-item {
    padding-left: 28px;
  }

  .ivu-menu-vertical .ivu-menu-item-group-title {
    height: 28px;
    line-height: 28px;
  }

  .ivu-menu-vertical .ivu-menu-item,
  .ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 12px 22px;
  }
}

.menu-close {
  &.side-bar {
    width: 60px;
  }
  .route-name,
  .ivu-icon-ios-arrow-down,
  .ivu-menu-item-group-title {
    display: none;
  }
  li.ivu-menu-submenu li.ivu-menu-item {
    padding-left: 22px;
  }
  .ivu-tooltip-popper {
    left: 60px !important;
  }
}

.toggle-button {
  text-align: center;
  .ivu-btn-text {
    color: #BDBDBD;
    transition: all .3s;

    &:hover {
      color: #57a3f3;
    }
  }
}

.vertical-button {
  transform: rotate(90deg);
}
</style>
