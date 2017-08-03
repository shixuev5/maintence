<template>
  <div id="root">
    <Row>
      <Col span="21">
      <Form ref="formInline" :model="form" :label-width="100" inline>
        <Form-item prop="date" label="日志时间：">
          <Date-picker v-model="form.date" type="date" format="yyyy年M月d日" :options="dateOption" placeholder="选择日期" style="width: 200px"></Date-picker>
        </Form-item>
        <Form-item prop="statuscode" label="服务运行状态：">
          <Select v-model="form.statuscode" clearable style="width:200px">
            <Option-group label="成功">
              <Option v-for="success in statuscode.success" :value="success.value" :key="success.value">{{ success.label }}</Option>
            </Option-group>
            <Option-group label="失败">
              <Option v-for="error in statuscode.error" :value="error.value" :key="error.value">{{ error.label }}</Option>
            </Option-group>
          </Select>
        </Form-item>
        <div class="button">
          <Button type="primary" icon="ios-search" @click="handleSubmit()">搜索</Button>
          <Button type="ghost" @click="handleReset()" style="margin-left:8px">重置</Button>
        </div>
      </Form>
      </Col>
      <Col span="3">
      <Button class="export" :loading="exportLoading" type="primary" size="large" @click="exportData()">
        <Icon v-show="!exportLoading" type="ios-download-outline" size="20"></Icon>
        <span v-if="!exportLoading">导出</span>
        <span v-else>导出中...</span>
      </Button>
      </Col>
    </Row>
    <Table ref="table" :data="data" :columns="columns" size="small" border highlight-row stripe>
    </Table>
    <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changeSize" size="small" placement="top" show-total show-sizer show-elevator></Page>
  </div>
</template>
<script>
import { fetchPlatformLog } from '@/api/log/log';
import filters from '@/filters';

export default {
  name: 'OperateLog',
  data() {
    return {
      form: {
        date: Date.now(),
        statuscode: ''
      },
      exportLoading: false,
      statuscode: {
        success: [{
          value: '200',
          label: '200'
        }, {
          value: '304',
          label: '304'
        }],
        error: [{
          value: '400',
          label: '400'
        }, {
          value: '403',
          label: '403'
        }, {
          value: '404',
          label: '404'
        }, {
          value: '500',
          label: '500'
        }]
      },
      dateOption: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        },
        shortcuts: [
          {
            text: '今天',
            value() {
              return new Date();
            }
          },
          {
            text: '昨天',
            value() {
              return new Date(Date.now() - (3600 * 1000 * 24));
            }
          },
          {
            text: '一周前',
            value() {
              return new Date(Date.now() - (3600 * 1000 * 24 * 7));
            }
          }
        ]
      },
      data: [],
      columns: [{
        title: '请求IP',
        align: 'center',
        key: 'remoteIp'
      },
      {
        title: '请求方式',
        key: 'requestMothod'
      },
      {
        title: '发送字节数(byte)',
        key: 'bytesSent'
      },
      {
        title: '请求处理时间',
        key: 'requestProcessTime'
      },
      {
        title: '响应时间',
        key: 'responseCommitTime'
      },
      {
        title: '服务运行状态',
        key: 'statusCode'
      },
      {
        title: '创建时间',
        key: 'date',
        align: 'center',
        render: (h, params) => <div>{filters.formatDate(params.row.date)}</div>
      },
      {
        title: '服务地址',
        key: 'requestURI'
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
  methods: {
    show(index) {
      this.$Modal.info({
        title: '详细信息',
        content: `服务地址： ${this.data[index].requestURI}}`
      });
    },
    exportData() {
      this.exportLoading = true;
      fetchPlatformLog(this.form, this.current, this.total).then(response => {
        this.$refs.table.exportCsv({
          filename: '平台日志',
          original: false,
          columns: this.columns,
          data: response.data.dataSource.map(val => {
            val.date = filters.formatDate(val.date);
            return val;
          })
        });
        this.exportLoading = false;
      });
    },
    handleSubmit() {
      fetchPlatformLog(this.form, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
        this.total = response.data.pageInfo.totalCount;
        this.$Message.success('刷新成功！');
      });
    },
    handleReset() {
      this.$refs.formInline.resetFields();
    },
    changePage(pageIndex) {
      this.current = pageIndex;
      fetchPlatformLog(this.form, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
      });
    },
    changeSize(pageSize) {
      this.pageSize = pageSize;
      fetchPlatformLog(this.form, this.current, this.pageSize).then(response => {
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

  .button {
    display: inline-block;
    margin-bottom: 24px;
    margin-right: 10px;
  }

  .export .ivu-icon {
    margin-right: 10px;
  }

  .ivu-table-wrapper {
    max-height: calc(~"100% - 106px");
    overflow-y: auto;
  }

  .ivu-page {
    margin-top: 24px;
  }
}
</style>
