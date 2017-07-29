<template>
  <div id="root">
    <div class="header">
      <Row>
        <Col span="21">
        <Form ref="formInline" :model="form" :label-width="100" inline>
          <Form-item prop="date" label="日志时间：">
            <Date-picker v-model="form.date" type="date" :options="dateOption" placeholder="选择日期" style="width: 200px"></Date-picker>
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
        <Button class="export" type="primary" size="large" @click="exportData()">
          <Icon type="ios-download-outline" size="20"></Icon>导出
        </Button>
        </Col>
      </Row>
    </div>
    <Table ref="table" :data="data" :columns="columns" size="small" border highlight-row stripe>
    </Table>
    <div class="footer">
      <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changeSize" size="small" placement="top" show-total show-sizer show-elevator></Page>
    </div>
  </div>
</template>
<script>
import { fetchPlatformLog, downloadPlatformLog } from '@/api/log/log';
import filters from '@/filters';
import { getStyle, debounce } from '@/utils/util';

export default {
  name: 'OperateLog',
  data() {
    return {
      form: {
        date: Date.now(),
        statuscode: ''
      },
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
        fixed: 'right',
        align: 'center',
        //eslint-disable-next-line
        render: (h, params) => <i-button type="primary" size="small" onClick={this.show.bind(this, params.index)}>查看</i-button>
      }],
      tableHeight: 0,
      total: 0,
      current: 1
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
      if (this.total > 1000) {
        const fileds = this.columns.map(val => ({
          name: val.key,
          alias: val.title
        }));
        downloadPlatformLog(fileds, this.filter);
      } else {
        this.$refs.table.exportCsv({
          filename: '平台运行日志',
          original: false,
          columns: this.columns,
          data: this.data.map((val) => {
            val.date = filters.formatDate(val.date);
            return val;
          })
        });
      }
    },
    handleSubmit() {
      fetchPlatformLog(this.form, this.current).then((response) => {
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
      fetchPlatformLog(this.form, this.current).then((response) => {
        this.data = response.data.dataSource;
      });
    },
    changeSize(pageSize) {
      fetchPlatformLog(this.form, this.current, pageSize).then((response) => {
        this.data = response.data.dataSource;
      });
    },
    calcTableHeight() {
      const totalHeight = getStyle(this.$el, 'height');
      const headerHeight = getStyle(document.getElementsByClassName('header')[0], 'height');
      const footerHeight = getStyle(document.getElementsByClassName('footer')[0], 'height');
      this.tableHeight = totalHeight - headerHeight - footerHeight;
    }
  },
  created() {
    this.handleSubmit();
  },
  mounted() {
    this.calcTableHeight();
    window.addEventListener('resize', debounce(this.calcTableHeight), false);
  },
  beforeDestroy() {
    window.removeEventListener('resize', debounce(this.calcTableHeight), false);
  }
};
</script>
<style lang="less" scoped>
#root {
  height: 100%;
  width: 100%;
}

.button {
  display: inline-block;
  margin-bottom: 24px;
  margin-right: 10px;
}

.export {
  .ivu-icon {
    margin-right: 10px;
  }
}

.footer {
  height: 45px;
  padding: 20px 0;
}
</style>
