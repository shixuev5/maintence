<template>
  <div>
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
      });
    }
  },
  mounted() {
    pell.init({
      element: document.getElementById('pell'),
      actions: [
        'bold',
        { name: 'italic', icon: '&#9786;', title: 'Zitalic' },
        'underline',
        {
          name: 'italic',
          result: () => window.pell.exec('italic')
        }
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
  }
};
</script>
<style lang="less" scoped>
#pell {
  height: 400px;
}
.footer {
  text-align: center;
}
</style>
