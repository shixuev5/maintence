<template>
  <div id="root">
    <div class="header">
      <Row>
        <Col span="21">
        <Form ref="formInline" :model="form" :label-width="80" inline>
          <Form-item prop="serviceName" label="服务名称：">
            <Input v-model="form.serviceName" placeholder="请输入服务名称"></Input>
          </Form-item>
          <Form-item prop="serviceType" label="服务类型：">
            <Input v-model="form.serviceType" placeholder="请输入服务类型"></Input>
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
import { fetchServiceLog, downloadServiceLog } from '@/api/log/log';
import { getStyle, debounce } from '@/utils/util';

export default {
  name: 'ServiceLog',
  data() {
    return {
      form: {
        serviceName: '',
        serviceType: '',
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
        title: '服务名称',
        key: 'servicename'
      },
      {
        title: '服务类型',
        key: 'servicetypename'
      },
      {
        title: '组织名称',
        key: 'organizename'
      },
      {
        title: '错误次数',
        key: 'failtotalcount'
      },
      {
        title: '成功次数',
        key: 'successtotalcount'
      },
      {
        title: '创建时间',
        key: 'servicelogdate'
      }],
      tableHeight: 0,
      total: 0,
      current: 1
    };
  },
  computed: {
    filter() {
      return {
        servicename: this.form.serviceName,
        servicetype: this.form.serviceType,
        starttime: +new Date(this.form.date[0]) || '',
        endtime: +new Date(this.form.date[1]) || ''
      };
    }
  },
  methods: {
    exportData() {
      if (this.total > 1000) {
        const fileds = this.columns.map(val => ({
          name: val.key,
          alias: val.title
        }));
        downloadServiceLog(fileds, this.filter);
      } else {
        this.$refs.table.exportCsv({
          filename: '操作日志',
          original: false,
          columns: this.columns,
          data: this.data
        });
      }
    },
    handleSubmit() {
      fetchServiceLog(this.filter, this.current).then(response => {
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
      fetchServiceLog(this.filter, this.current).then(response => {
        this.data = response.data.dataSource;
      });
    },
    changeSize(pageSize) {
      fetchServiceLog(this.filter, this.current, pageSize).then(response => {
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

