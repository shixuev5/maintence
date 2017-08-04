<template>
  <Row>
    <Col span="5" class="left">
    <Input placeholder="输入关键字进行过滤" v-model="filterText"></Input>
    <el-tree ref="tree" @node-click="clickTree" :render-content="renderTree" :data="treeData" :props="defaultProps" :filter-node-method="filterNode" default-expand-all highlight-current></el-tree>
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
    <Alert class="alert-info" v-show="selection.length !== 0" v-if="selection.length < this.pageSize">
      <Row>
        <Col span="23">
        <Tag @on-close="closeTag" v-for="select in selection" :key="select.truename" :name="select.truename" closable color="blue">{{select.truename}}</Tag>
        </Col>
        <Col span="1">
        <span class="clear" @click="selection = []">清空</span>
        </Col>
      </Row>
    </Alert>
    <Alert class="alert-info" v-else show-icon>已选择当前页{{this.pageSize}}项。
      <span>选择全部{{this.total}}项</span>
    </Alert>
    <Table ref="table" :data="tableData" :columns="columns" @on-selection-change="selectChange" size="small" border highlight-row stripe>
    </Table>
    <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changeSize" size="small" placement="top" show-total show-sizer show-elevator></Page>
    </Col>
  </Row>
</template>

<script>
import { fetchOrganize, fetchUserList, deleteUsers } from '@/api/manager/user';
import { fetchDictionaryByType } from '@/api/sysmanage/dictionary';
import axios from 'axios';
import SvgIcon from '@/components/Icon';

const dictionaryType = ['民族类型', '教育程度', '人员类别', '政治面貌', '性别'];

export default {
  name: 'UserManager',
  components: {
    SvgIcon
  },
  data() {
    return {
      dictionary: [],
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      keyword: '',
      tableData: [],
      selection: [],
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
          const state = params.row.flag === 1 ? '有效' : '无效';
          const color = params.row.flag === 1 ? 'green' : 'red';
          return <tag type="dot" color={color}>{state}</tag>;
        }
      },
      {
        title: '人员类别',
        key: 'type',
        render: (h, params) => {
          const result = this.dictionary.filter(val => val.type === '人员类别' && `${params.row.type}` === val.code);
          return result[0].data;
        }
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (h, params) =>
          <div>
            <i-button type="text">修改</i-button>
            <poptip title="您确定要删除这条内容吗？" width="200" placement="top-end" confirm onOn-ok={() => this.ok(params)}>
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
  methods: {
    renderTree(h, { node }) {
      const iconClass = node.level === 1 ? 'zhengfu' : 'danwei';
      return <span><SvgIcon iconClass={iconClass} size={22} style={{ marginRight: '8px' }}></SvgIcon>{node.data.name}</span>;
    },
    clickTree(node) {
      fetchUserList(this.keyword, node.id, this.current, this.pageSize).then(response => {
        this.tableData = response.data.dataSource;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    selectChange(selection) {
      this.selection = selection;
    },
    closeTag(event, truename) {
      this.selection = this.selection.filter(val => val.truename !== truename);
    },
    ok(params) {
      if (this.$store.getters.orgId !== params.row.orgid) {
        this.$Message.success('您当前没有该权限！');
      } else {
        deleteUsers([params.row.id]).then(() => {
          this.tableData.splice(params.index, 1);
          this.$Message.success('删除成功！');
        });
      }
    },
    changePage(pageIndex) {
      this.current = pageIndex;
    },
    changeSize(pageSize) {
      this.pageSize = pageSize;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    axios.all([fetchOrganize(), fetchDictionaryByType(dictionaryType)])
      .then(axios.spread((organize, dictionary) => {
        this.treeData = organize.data;
        this.dictionary = dictionary.data;
      }));
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
      line-height: 26px;
      float: right;
    }
  }
  .ivu-page {
    margin-top: 24px;
  }
}
</style>
