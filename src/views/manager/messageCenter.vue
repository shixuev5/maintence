<template>
  <div id="root">
    <Tabs v-model="readState">
      <Tab-pane label="未读消息" name="0">
      </Tab-pane>
      <Tab-pane label="已读消息" name="1">
      </Tab-pane>
    </Tabs>
    <Table ref="table" :data="readState === 0 ? unReadMsg : readMsg" :columns="columns" size="small" highlight-row stripe></Table>
    <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changeSize" size="small" placement="top" show-total show-sizer show-elevator></Page>
  </div>
</template>
<script>
import { fetchMessage } from '@/api/manager/messageCenter';
import filters from '@/filters';

export default {
  name: 'MessageCenter',
  data() {
    return {
      readState: '',
      title: '',
      unReadMsg: [],
      readMsg: [],
      columns: [{
        type: 'index',
        width: 60,
        align: 'center'
      }, {
        title: '消息标题',
        key: 'title',
        width: 200
      },
      {
        title: '消息内容',
        key: 'content',
        width: 680
      },
      {
        title: '发送人',
        key: 'sendName'
      },
      {
        title: '发送时间',
        key: 'createTime',
        sortable: 'custom',
        render: (h, params) => <div>{filters.formatDate(params.row.createTime)}</div>
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (h, params) => <i-button type="text" onClick={() => { this.show(params.index); }}>查看</i-button>
      }],
      total: 0,
      current: 1,
      pageSize: 10
    };
  },
  computed: {
    filter() {
      return {
        title: this.title,
        readState: '',
        startDate: '',
        endDate: ''
      };
    }
  },
  methods: {
    show(index) {
      console.log(index);
    },
    handleSubmit() {
      fetchMessage(this.filter, this.current, this.pageSize).then(response => {
        response.data.dataSource.forEach(val =>
          (val.readState === 0 ? this.unReadMsg.push(val) : this.readMsg.push(val))
        );
        this.total = response.data.pageInfo.totalCount;
        this.$Message.success('刷新成功！');
      });
    },
    handleReset() {
      this.$refs.formInline.resetFields();
    },
    changePage(pageIndex) {
      this.current = pageIndex;
      fetchMessage(this.filter, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
      });
    },
    changeSize(pageSize) {
      this.pageSize = pageSize;
      fetchMessage(this.filter, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
      });
    }
  },
  created() {
    this.handleSubmit();
  },
  watch: {
    $route: 'handleSubmit'
  }
};
</script>
<style lang="less" scoped>
#root {
  height: 100%;
  position: relative;

  .button {
    display: inline-block;
    margin-bottom: 24px;
    margin-right: 10px;
  }

  .ivu-table-wrapper {
    max-height: calc(~"100% - 103px");
    overflow-y: auto;
  }

  .ivu-page {
    margin-top: 24px;
  }
}
</style>

