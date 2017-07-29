<template>
  <Row>
    <Col span="5" class="left">
    <Input placeholder="输入关键字进行过滤" v-model="filterText"></Input>
    <el-tree ref="tree" class="filter-tree" :data="treeData" :props="defaultProps" default-expand-all :filter-node-method="filterNode"></el-tree>
    </Col>
    <Col span="18" offset="1" class="right">
    <Table ref="table" :data="tableData" :columns="columns" size="small" border highlight-row stripe>
    </Table>
    <div class="footer">
      <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changeSize" size="small" placement="top" show-total show-sizer show-elevator></Page>
    </div>
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
      tableData: [],
      columns: [{
        title: '真实姓名',
        key: 'operationname'
      },
      {
        title: '登陆名',
        key: 'logtypename'
      },
      {
        title: '状态',
        key: 'userip'
      },
      {
        title: '人员类型',
        key: 'username'
      }, {
        title: '操作',
        key: 'action'
      }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
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
    showUserList() {
      fetchUserList().then(response => {
        this.tableData = response.data.dataSource;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
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
    border: none;
    background: transparent;
  }
}

.right {
  .footer {
    height: 45px;
    padding: 20px 0;
  }
}
</style>
