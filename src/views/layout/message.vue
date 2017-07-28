<template>
  <Dropdown class="message">
    <Badge :count="unReadMessage.length" overflow-count="99">
      <Icon type="ios-bell-outline" size="30" color="#fff"></Icon>
    </Badge>
    <Dropdown-menu slot="list">
      <header>站内消息</header>
      <div v-bar>
        <ul class="content-wrap" v-if="unReadMessage.length !== 0">
          <li v-for="message in unReadMessage" :key="message.title">
            {{ message.title }}
            <span>{{ message.time }}</span>
          </li>
        </ul>
        <p v-else style="text-align: center">您暂时没有站内消息</p>
      </div>
      <footer>
        <router-link :to="{path: '/securitymenu/messagecenter/messagecenter001'}">查看更多</router-link>
      </footer>
      </div>
    </Dropdown-menu>
  </Dropdown>
</template>
<script>
export default {
  name: 'Msg',
  data() {
    return {
    };
  },
  computed: {
    unReadMessage() {
      return this.$store.getters.unReadMessage;
    }
  },
  created() {
    this.$store.dispatch('fetchMsg');
  }
};
</script>
<style lang="less">
@sidebar: #363e4f;
@border: #f4f4f4;

.message {
  float: right;
  padding: 0 30px;
  position: relative;
  transition: background-color .3s;

  &:after {
    content: '';
    display: block;
    height: 34px;
    width: 1px;
    background: #BDBDBD;
    position: absolute;
    top: 14px;
    right: 0;
  }

  &:hover {
    background-color: @sidebar;
  }

  .ivu-dropdown-menu {
    width: 240px;
    max-height: 250px;
  }

  header {
    line-height: 28px;
    text-indent: 20px;
    border-bottom: 1px solid @border;
  }

  ul.content-wrap {
    max-height: 190px;

    li {
      line-height: 50px;

      &:not(:last-child) {
        border-bottom: 1px solid @border;
      }

      &:hover {
        background: #f4f4f4;
      }

      span {
        float: right;
        margin-right: 40px;
      }
    }
  }

  footer {
    border-top: 1px solid @border;
    text-align: center;
    line-height: 28px;
  }
}
</style>
