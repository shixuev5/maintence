<template>
  <div id="root">
    <Form :model="form" label-position="top">
      <Form-item label="收件人：">
        <Select v-model="form.receiveId" multiple filterable remote :remote-method="remoteMethod" :loading="receiverLoading">
          <Option v-for="receiver in receiverList" :value="receiver.name" :key="receiver.name">{{receiver.truename}}</Option>
        </Select>
      </Form-item>
      <Form-item label="主题：">
        <Input v-model="form.title" placeholder="请输入邮件主题..."></Input>
      </Form-item>
    </Form>
    <div id="pell"></div>
    <div class="footer">
      <Button type="primary" icon="ios-paperplane-outline" :loading="sendLoading" @click="sendMsg">
        <span v-if="!sendLoading">发送</span>
        <span v-else>发送中...</span>
      </Button>
    </div>
  </div>
</template>
<script>
import 'pell/dist/pell.min.css';
import pell from 'pell';
import { fetchReceiver, sendMessage } from '@/api/manager/message';

export default {
  name: 'SendMessage',
  data() {
    return {
      form: {
        receiveId: [],
        title: ''
      },
      content: '',
      receiverLoading: false,
      sendLoading: false,
      receiverList: []
    };
  },
  methods: {
    remoteMethod(keyword) {
      this.receiverLoading = true;
      fetchReceiver(keyword).then(response => {
        this.receiverLoading = false;
        this.receiverList = response.data.dataSource;
      });
    },
    sendMsg() {
      const receiveId = this.form.receiveId.join(',');
      this.sendLoading = true;
      sendMessage(receiveId, this.form.title, this.content).then(() => {
        this.sendLoading = false;
        this.$store.dispatch('fetchMsg');
      });
    }
  },
  mounted() {
    pell.init({
      element: document.getElementById('pell'),
      actions: [
        {
          name: 'bold',
          title: '粗体'
        },
        {
          name: 'underline',
          title: '下划线'
        },
        {
          name: 'italic',
          title: '斜体',
          result: () => window.pell.exec('italic')
        }
        // 'Strike-through',
        // 'Heading 1',
        // 'Heading 2',
        // 'Paragraph',
        // 'Quote',
        // 'Ordered List',
        // 'Unordered List',
        // 'Code',
        // 'Horizontal Rule'
      ],
      classes: {
        actionbar: 'pell-actionbar',
        button: 'pell-button',
        editor: 'pell-editor'
      },
      onChange: html => {
        console.log(html);
        this.content = html;
      }
    });
    this.remoteMethod();
  }
};
</script>
<style lang="less" scoped>
#root {
  height: 100%;
}

#pell {
  height: calc(~"100% - 240px");

  &>:first-child {
    border-bottom: none !important;
  }

  &>:last-child {
    height: calc(~"100% - 30px");
    background: #fff;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;
    transition: all .3s;

    &:focus {
      border-color: #57a3f3;
      box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
    }
  }
}

.footer {
  margin-top: 24px;
  text-align: center;
}
</style>
