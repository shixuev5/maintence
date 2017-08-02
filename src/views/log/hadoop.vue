<template>
  <div id="root">
    <Row>
      <Col span="21">
      <Form ref="formInline" :model="form" :label-width="80" inline>
        <Form-item prop="nodeName" label="节点名称：">
          <Select v-model="form.nodeName" clearable style="width:200px">
            <Option-group label="主节点">
              <Option v-for="master in nodeName.masters" :value="master.value" :key="master.value">{{ master.label }}</Option>
            </Option-group>
            <Option-group label="子节点">
              <Option v-for="slave in nodeName.slaves" :value="slave.value" :key="slave.value">{{ slave.label }}</Option>
            </Option-group>
          </Select>
        </Form-item>
        <Form-item prop="date" label="日志时间：">
          <Date-picker v-model="form.date" format="yyyy年M月d日" type="date" :options="dateOption" :clearable="false" placeholder="选择日期" style="width: 200px"></Date-picker>
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
import { fetchHadoopLog, fetchHadoopNode } from '@/api/log/log';
import filters from '@/filters';

export default {
  name: 'HadoopLog',
  data() {
    return {
      form: {
        date: Date.now(),
        nodeName: ''
      },
      exportLoading: false,
      nodeName: {
        masters: [],
        slaves: []
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
      columns: [
        {
          title: '日志级别',
          key: 'warnlevel',
          width: 200
        },
        {
          title: '日志信息',
          key: 'info',
          render: (h, params) =>
            <poptip trigger="hover" width={600} content={params.row.info} transfer>
              <p class="row-info">{params.row.info}</p>
            </poptip>
        },
        {
          title: '日志时间',
          key: 'date',
          align: 'center',
          width: 200,
          sortable: 'custom',
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
      fetchHadoopLog(this.form, this.current, this.total).then(response => {
        this.$refs.table.exportCsv({
          filename: 'Hadoop日志',
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
      const filter = {
        date: '2017-08-02',
        nodeName: this.form.nodeName
      };
      fetchHadoopLog(filter, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
        this.total = response.data.pageInfo.totalCount;
        this.$Message.success('刷新成功！');
      });
    },
    fetchHadoopNode() {
      return fetchHadoopNode().then(response => {
        //eslint-disable-next-line
        for (const node of response.data) {
          if (node.type === 'namenode') {
            this.nodeName.masters.push({ label: node.name, value: node.name });
          } else {
            this.nodeName.slaves.push({ label: node.name, value: node.name });
          }
        }
        this.form.nodeName = this.nodeName.masters[0].value;
      });
    },
    handleReset() {
      this.$refs.formInline.resetFields();
    },
    changePage(pageIndex) {
      this.current = pageIndex;
      fetchHadoopLog(this.form, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
      });
    },
    changeSize(pageSize) {
      this.pageSize = pageSize;
      fetchHadoopLog(this.form, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
      });
    }
  },
  created() {
    this.fetchHadoopNode().then(() => {
      this.handleSubmit();
    });
  },
  watch: {
    $route: 'handleSubmit'
  }
};
</script>
<style lang="less">
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

  .row-info {
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
