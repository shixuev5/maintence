<template>
  <div id="root">
    <Row>
      <Col span="21">
      <Form ref="formInline" :model="form" :label-width="80" inline>
        <Form-item prop="code" label="错误编码：">
          <Input v-model="form.code" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item prop="title" label="错误标题：">
          <Input v-model="form.title" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item prop="type" label="错误分类：" style="width: 300px">
          <Cascader v-model="form.type" :data="errorType" trigger="hover" filterable></Cascader>
        </Form-item>
        <div class="button">
          <Button type="primary" icon="ios-search" @click="handleSubmit()">搜索</Button>
          <Button type="ghost" @click="handleReset()" style="margin-left:8px">重置</Button>
        </div>
      </Form>
      </Col>
      <Col span="3">
      <Button class="button" type="primary" icon="plus">新增</Button>
      </Col>
    </Row>
    <Table ref="table" :data="data" :columns="columns" size="small" border highlight-row stripe>
    </Table>
    <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changeSize" size="small" placement="top" show-total show-sizer show-elevator></Page>
  </div>
</template>
<script>
import { fetchErrorType } from '@/api/log/log';
import { fetchErrorCode } from '@/api/sysmanage/errorCode';
import { cascaderTransform } from '@/utils/util';

export default {
  name: 'ErrorLog',
  data() {
    return {
      form: {
        code: '',
        title: '',
        level: '',
        type: ''
      },
      errorType: [],
      exportLoading: false,
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
        key: 'code'
      },
      {
        title: '错误标题',
        key: 'title'
      },
      {
        title: '错误标题',
        key: 'title'
      },
      {
        title: '错误日志分类',
        key: 'title',
        render: (h, params) => `${params.row.parentTypeName} - ${params.row.typeName}`
      },
      {
        title: '是否推送',
        key: 'issendout',
        align: 'center',
        width: 120,
        render: (h, params) =>
        <i-switch v-model={params.row.issendout === 1} disabled={this.disabled}>
            <span slot="open">是</span>
            <span slot="close">否</span>
        </i-switch>
      },
      {
        title: '错误描述',
        key: 'describe',
        width: 360
      },
      {
        title: '错误级别',
        key: 'level',
        align: 'center',
        width: 120,
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
        title: '操作',
        key: 'action',
        align: 'center',
        render: (h, params) => <i-button type="text" onClick={this.eidtRow.bind(this, params.row)}>编辑</i-button>
      }],
      disabled: true,
      isEdit: false,
      total: 0,
      current: 1,
      pageSize: 10
    };
  },
  methods: {
    handleSubmit() {
      fetchErrorCode(this.form, this.current, this.pageSize).then(response => {
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
    eidtRow(row) {
      console.log(row);
    },
    changePage(pageIndex) {
      this.current = pageIndex;
      fetchErrorCode(this.form, this.current, this.pageSize).then(response => {
        this.data = response.data.dataSource;
      });
    },
    changeSize(pageSize) {
      this.pageSize = pageSize;
      fetchErrorCode(this.form, this.current, this.pageSize).then(response => {
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

  .ivu-table-wrapper {
    max-height: calc(~"100% - 106px");
    overflow-y: auto;
  }

  .ivu-page {
    margin-top: 24px;
  }
}
</style>
