<template>
  <Row>
    <Col span="5" class="left">
    <Input placeholder="输入关键字进行过滤" v-model="filterText"></Input>
    <el-tree ref="tree" @node-click="clickTree" :data="treeData" :props="defaultProps" default-expand-all :filter-node-method="filterNode"></el-tree>
    </Col>
    <Col class="right" span="18" offset="1">
    <Row style="margin-bottom:24px">
      <Col span="12">
      <Button type="primary" icon="plus">新增</Button>
      <Dropdown placement="bottom-start">
        <Button type="ghost">
          其他
          <Icon type="arrow-down-b"></Icon>
        </Button>
        <Dropdown-menu slot="list">
          <Dropdown-item>批量删除</Dropdown-item>
          <Dropdown-item>批量修改密码</Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
      </Col>
      <Col offset="6" span="6">
      <Input :value="keyword" placeholder="请输入登录名、姓名、岗位名...">
      <Button slot="append" icon="ios-search"></Button>
      </Input>
      </Col>
    </Row>
    <!-- <Alert class="alert-info" show-icon>已选择当前页10项。
        <span>选择全部{{this.total}}项</span>
      </Alert> -->
    <!-- <Alert class="alert-info">
      <Row>
        <Col span="23">
        <Tag closable color="blue">标签一</Tag>
        </Col>
        <Col span="1">
        <span>清空</span>
        </Col>
      </Row>
    </Alert> -->
    <Table ref="table" :data="tableData" :columns="columns" size="small" border highlight-row stripe>
    </Table>
    <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changeSize" size="small" placement="top" show-total show-sizer show-elevator></Page>
    </Col>
  </Row>
</template>

<script>
import { fetchOrganize, fetchUserList } from '@/api/manager/user';

export default {
  name: 'UserManager',
  data() {
    return {
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      keyword: '',
      tableData: [],
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      },
      {
        title: '真实姓名',
        key: 'truename'
      },
      {
        title: '登陆名',
        key: 'name'
      },
      {
        title: '状态',
        key: 'flag',
        align: 'center',
        render: (h, params) => {
          const state = params.flags === 1 ? '有效' : '无效';
          const color = params.flags === 1 ? 'green' : 'red';
          return <tag type="dot" color={color}>{state}</tag>;
        }
      },
      {
        title: '人员类型',
        key: 'type'
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        // eslint-disable-next-line
        render: (h, params) =>
          <div>
            <i-button type="text">修改</i-button>
            <poptip title="您确定要删除这条内容吗？" width="200" placement="top-end" confirm onOnok={this.ok.bind(this, params.index)}>
              <i-button type="text">删除</i-button>
            </poptip>
          </div>
      }
      ],
      total: 0,
      current: 1,
      pageSize: 10
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    init() {
      fetchOrganize().then(response => {
        this.treeData = response.data;
      });
    },
    clickTree(node) {
      fetchUserList(this.keyword, node.id, this.current, this.pageSize).then(response => {
        this.tableData = response.data.dataSource;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    ok() {
      alert(1);
    },
    changePage(pageIndex) {
      this.current = pageIndex;
    },
    changeSize(pageSize) {
      this.pageSize = pageSize;
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.left {
  .el-tree {
    margin-top: 24px;
    border: none;
    background: transparent;
  }
}

.right {
  .alert-info {
    margin-top: -12px;

    span {
      color: #2d8cf0;
      cursor: pointer;
    }
  }
  .ivu-page {
    margin-top: 24px;
  }
}
</style>
