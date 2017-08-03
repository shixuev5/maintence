<template>
  <div id="root">
    <Row>
      <Col span="21">
      <Form ref="formInline" :model="form" :label-width="80" inline>
        <Form-item prop="errorCode" label="错误编码：">
          <Input v-model="form.errorCode" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item prop="type" label="错误分类：" style="width: 300px">
          <Cascader v-model="form.type" :data="errorType" trigger="hover" filterable></Cascader>
        </Form-item>
        <Form-item prop="date" label="日志时间：">
          <Date-picker v-model="form.date" type="date" :options="dateOption" placeholder="选择日期" style="width: 200px"></Date-picker>
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
import { fetchErrorLog, fetchErrorType } from '@/api/log/log';
import { cascaderTransform } from '@/utils/util';
import filters from '@/filters';

export default {
  name: 'ErrorLog',
  data() {
    return {
      form: {
        errorCode: '',
        date: '',
        level: '',
        type: ''
      },
      errorType: [],
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
        title: '错误编码',
        key: 'errorCode'
      },
      {
        title: '日志级别',
        key: 'level',
        render: (h, params) => {
          let level;
          let color;
          switch (params.row.level) {
            case 1:
              level = '一般'; color = 'green'; break;
            case 2:
              level = '严重'; color = 'yellow'; break;
            case 3:
              level = '紧急'; color = 'red'; break;
            default:
              level = '信息'; color = 'blue';
          }
          return <tag type="dot" color={color}>{level}</tag>;
        },
        filterMultiple: false,
        filters: [
          {
            label: '严重',
            value: '2'
          },
          {
            label: '紧急',
            value: '3'
          }
        ],
        filterMethod(value) {
          this.form.level = value;
          this.handleSubmit();
        }
      },
      {
        title: '错误分类类型',
        key: 'type'
      },
      {
        title: '错误信息',
        key: 'info'
      },
      {
        title: '日志时间',
        key: 'date',
        align: 'center',
        render: (h, params) => <div>{filters.formatDate(params.row.date)}</div>
      }],
      total: 0,
      current: 1,
      pageSize: 10
    };
  },
  methods: {
    exportData() {
      this.exportLoading = true;
      fetchErrorLog(this.form, this.current, this.total).then(response => {
        this.$refs.table.exportCsv({
          filename: '错误日志',
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
      fetchErrorLog(this.form, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
        this.total = response.data.pageInfo.totalCount;
        this.$Message.success('刷新成功！');
      });
    },
    fetchErrorType() {
      fetchErrorType().then(response => {
        this.errorType = cascaderTransform(response.data, { value: 'id', label: 'text' });
      });
    },
    handleReset() {
      this.$refs.formInline.resetFields();
    },
    changePage(pageIndex) {
      this.current = pageIndex;
      fetchErrorLog(this.form, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
      });
    },
    changeSize(pageSize) {
      this.pageSize = pageSize;
      fetchErrorLog(this.form, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
      });
    }
  },
  created() {
    this.handleSubmit();
    this.fetchErrorType();
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
