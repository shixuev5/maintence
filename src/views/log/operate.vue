<template>
  <div id="root">
    <Row>
      <Col span="21">
      <Form ref="formInline" :model="form" :label-width="80" inline>
        <Form-item :rules="rules" prop="ip" label="IP地址：">
          <Input v-model="form.ip" placeholder="请输入IP地址"></Input>
        </Form-item>
        <Form-item prop="name" label="操作名称：">
          <Input v-model="form.name" placeholder="请输入操作名称"></Input>
        </Form-item>
        <Form-item prop="date" label="起止时间：">
          <Date-picker type="datetimerange" v-model="form.date" :options="dateOption" format="yyyy/MM/dd HH:mm" placeholder="选择日期和时间" style="width: 300px"></Date-picker>
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
    <!-- @on-sort-change="remoteSort" -->
    <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changeSize" size="small" placement="top" show-total show-sizer show-elevator></Page>
  </div>
</template>
<script>
import { fetchOperateLog } from '@/api/log/log';
import validate from '@/utils/validate';
import filters from '@/filters';

export default {
  name: 'OperateLog',
  data() {
    return {
      form: {
        ip: '',
        name: '',
        date: []
      },
      dateOption: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        },
        shortcuts: [
          {
            text: '今天',
            value() {
              return [new Date().setHours(0, 0, 0, 0), Date.now()];
            }
          },
          {
            text: '昨天',
            value() {
              return [Date.now() - (3600 * 1000 * 24), Date.now()];
            }
          },
          {
            text: '一周前',
            value() {
              return [Date.now() - (3600 * 1000 * 24 * 7), Date.now()];
            }
          }
        ]
      },
      data: [],
      columns: [{
        title: '操作名称',
        key: 'operationname'
      },
      {
        title: '日志类型',
        key: 'logtypename'
      },
      {
        title: 'IP地址',
        key: 'userip'
      },
      {
        title: '操作者名称',
        key: 'username'
      },
      {
        title: '执行状态',
        key: 'logstatusname',
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          const color = row.logstatus === 200 ? 'green' : 'red';
          return <tag type="dot" color={color}>{params.row.logstatusname}</tag>;
        },
        filterMultiple: false,
        filters: [
          {
            label: '成功',
            value: '成功'
          },
          {
            label: '失败',
            value: '失败'
          }
        ],
        filterMethod(value, row) {
          return row.logstatusname.indexOf(value) > -1;
        }
      },
      {
        title: '创建时间',
        key: 'logdate',
        sortable: 'custom',
        render: (h, params) => <div>{filters.formatDate(params.row.logdate)}</div>
      },
      {
        title: '日志来源',
        key: 'operationsourcename',
        filters: [
          {
            label: '统计分析',
            value: '统计分析'
          },
          {
            label: '平台监控',
            value: '平台监控'
          },
          {
            label: '日志管理',
            value: '日志管理'
          }
        ],
        filterMethod(value, row) {
          return row.operationsourcename.includes(value);
        }
      }],
      rules: {
        type: 'string',
        pattern: validate.ip,
        message: '请输入正确的ip地址',
        trigger: 'blur'
      },
      exportLoading: false,
      total: 0,
      current: 1,
      pageSize: 10
    };
  },
  computed: {
    filter() {
      return {
        ip: this.form.ip,
        name: this.form.name,
        start: +new Date(this.form.date[0]) || '',
        end: +new Date(this.form.date[1]) || ''
      };
    }
  },
  methods: {
    exportData() {
      this.exportLoading = true;
      fetchOperateLog(this.filter, this.current, this.total).then(response => {
        this.$refs.table.exportCsv({
          filename: '操作日志',
          original: false,
          columns: this.columns,
          data: response.data.dataSource.map(val => {
            val.logdate = filters.formatDate(val.logdate);
            return val;
          })
        });
        this.exportLoading = false;
      });
    },
    handleSubmit() {
      fetchOperateLog(this.filter, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
        this.total = response.data.pageInfo.totalCount;
        this.$Message.success('刷新成功！');
      });
    },
    handleReset() {
      this.$refs.formInline.resetFields();
    },
    // remoteSort(column, key, order) {
    //   fetchOperateLog(this.filter, this.current, this.pageSize).then(response => {
    //     this.data = response.data.dataSource;
    //   });
    // },
    changePage(pageIndex) {
      this.current = pageIndex;
      fetchOperateLog(this.filter, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
      });
    },
    changeSize(pageSize) {
      this.pageSize = pageSize;
      fetchOperateLog(this.filter, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
      });
    }
  },
  created() {
    this.handleSubmit();
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
