import Login from '@/views/login/login';
import ResourceAllocat from 'views/resource/allocat';

const Wrap = { template: '<router-view></router-view>' };

const Layout = () =>
  import('views/layout/layout.vue');
const DashBoard = () =>
  import('views/layout/dashboard.vue');

// const ResourceAllocat = () =>
//   import('views/resource/allocat');
const ResourceView = () =>
  import('views/resource/view');
const ResourceRecover = () =>
  import('views/resource/recover');

const UserManage = () =>
  import('views/manager/user');
const OrganizeManager = () =>
  import('views/manager/organize');
const PostManager = () =>
  import('views/manager/post');
const MessageCenter = () =>
  import('views/manager/messageCenter');
const SendMessage = () =>
  import('views/manager/sendMessage');
const BlackList = () =>
  import('views/manager/blackList');
const WhiteList = () =>
  import('views/manager/whiteList');


const OperateLog = () =>
  import('views/log/operate');
const ServiceLog = () =>
  import('views/log/service');
const PlatformLog = () =>
  import('views/log/platform');
const HadoopLog = () =>
  import('views/log/hadoop');
const ErrorLog = () =>
  import('views/log/error');


const ServiceState = () =>
  import('views/statemenu/serviceState');
const VisitState = () =>
  import('views/statemenu/visitState');
const WebAppState = () =>
  import('views/statemenu/webappState');

const WebMonitor = () =>
  import('views/monitor/webMonitor');
const DataBaseMonitor = () =>
  import('views/monitor/dataBaseMonitor');
const GISMonitor = () =>
  import('views/monitor/gisMonitor');
const ServiceMonitor = () =>
  import('views/monitor/serviceMonitor');
const HdfsMonitor = () =>
  import('views/monitor/hdfsMonitor');
const Ganglia = () =>
  import('views/monitor/ganglia');
const JettyMonitor = () =>
  import('views/monitor/jettyMonitor');

const Dictionary = () =>
  import('views/sysmanage/dictionary');
const ServerConfig = () =>
  import('views/sysmanage/serverConfig');
const AlarmRule = () =>
  import('views/sysmanage/alarmRule');
const AlarmMould = () =>
  import('views/sysmanage/alarmMould');
const ErrorCode = () =>
  import('views/sysmanage/errorCode');

const ResourceBackup = () =>
  import('views/backup/resourceBackup');
const AppBackup = () =>
  import('views/backup/appBackup');
const CacheReply = () =>
  import('views/backup/cacheReply');

export const constRoutes = [{
  path: '/login',
  component: Login,
  name: '用户登陆'
}, {
  path: '/',
  component: Layout,
  name: '首页',
  children: [{
    path: '',
    component: DashBoard,
    name: '展示页'
  }]
}];

export const asyncRoutes = [{
  path: '/resourcemenu',
  component: Layout,
  name: '资源管理',
  redirect: '/resourcemenu/resourceallocat',
  icon: 'bingzhuangtu',
  children: [{
    path: 'resourceallocat',
    component: ResourceAllocat,
    name: '资源分配',
    icon: 'fenpei'
  }, {
    path: 'resourceview',
    component: ResourceView,
    name: '资源查看',
    icon: 'chakan1'
  }, {
    path: 'resourcerecover',
    component: ResourceRecover,
    name: '资源回收',
    icon: 'huishou'
  }]
}, {
  path: '/securitymenu',
  component: Layout,
  name: '安全管理',
  redirect: '/securitymenu/usermanage',
  icon: 'safe',
  children: [{
    path: 'usermanage',
    component: UserManage,
    name: '用户管理',
    icon: 'weibiaoti114'
  }, {
    path: '/securitymenu/groupmanage',
    name: '群组管理',
    component: Wrap,
    children: [{
      path: 'groupmanage001',
      component: OrganizeManager,
      name: '组织机构',
      icon: 'portal-icon-zuzhi'
    },
    {
      path: 'groupmanage002',
      component: PostManager,
      name: '岗位信息',
      icon: 'gangweiguanli'
    }
    ]
  }, {
    path: '/securitymenu/rightmanage',
    name: '权限管理',
    component: Wrap,
    children: [{
      path: 'rightmanage001',
      component: ResourceAllocat,
      name: '功能权限',
      icon: 'quanxian'
    },
    {
      path: 'rightmanage002',
      component: ResourceAllocat,
      name: '数据/服务',
      icon: 'quanxian'
    }
    ]
  }, {
    path: '/securitymenu/messagecenter',
    name: '消息管理',
    component: Wrap,
    children: [{
      path: 'messagecenter001',
      component: MessageCenter,
      name: '消息中心',
      icon: 'xiaoxizhongxin'
    },
    {
      path: 'messagecenter002',
      component: SendMessage,
      name: '站内信',
      icon: 'duanxinfasong'
    }
    ]
  }, {
    path: '/securitymenu/antispam',
    name: '反垃圾管理',
    component: Wrap,
    children: [{
      path: 'antispam001',
      component: BlackList,
      name: '黑名单',
      icon: 'heimingdan'
    },
    {
      path: 'antispam002',
      component: WhiteList,
      name: '白名单',
      icon: 'baimingdan'
    }
    ]
  }]
}, {
  path: '/logmanagemenu',
  component: Layout,
  name: '日志管理',
  redirect: '/logmanagemenu/operatelog',
  icon: 'rizhi',
  children: [{
    path: 'operatelog',
    component: OperateLog,
    name: '操作日志',
    icon: 'caozuo1'
  }, {
    path: 'servicelog',
    component: ServiceLog,
    name: '服务日志',
    icon: 'fuwu1'
  }, {
    path: 'platformlog',
    component: PlatformLog,
    name: '平台日志',
    icon: 'pingtai'
  }, {
    path: 'hadooplog',
    component: HadoopLog,
    name: 'Hadoop日志',
    icon: 'hadoop'
  }, {
    path: 'errorlog',
    component: ErrorLog,
    name: '错误日志',
    icon: 'bug'
  }]
}, {
  path: '/statmenu',
  component: Layout,
  name: '统计分析',
  redirect: '/statmenu/servicestat',
  icon: 'fenxi',
  children: [{
    path: 'servicestat',
    component: ServiceState,
    name: '服务访问',
    icon: 'iconfonttongji'
  }, {
    path: 'visitstat',
    component: VisitState,
    name: '用户访问',
    icon: 'yonghuzonghetongji'
  }, {
    path: 'webappstat',
    component: WebAppState,
    name: '平台应用',
    icon: 'statistics'
  }]
}, {
  path: '/platformmonitormenu',
  component: Layout,
  name: '平台监控',
  redirect: '/platformmonitormenu/webmonitor',
  icon: 'jiankong',
  children: [{
    path: 'webmonitor',
    component: WebMonitor,
    name: 'Web容器',
    icon: 'tomcat'
  }, {
    path: 'databasemonitor',
    component: DataBaseMonitor,
    name: '数据库',
    icon: 'shujuku'
  }, {
    path: 'gismonitor',
    component: GISMonitor,
    name: 'GIS服务器',
    icon: 'maps'
  }, {
    path: 'servicemonitor',
    component: ServiceMonitor,
    name: '平台服务监控',
    icon: 'pingtai'
  }, {
    path: '/platformmonitormenu/hadoopmonitor',
    name: '分布式平台管理',
    component: Wrap,
    children: [{
      path: 'HadoopMonitor001',
      component: HdfsMonitor,
      name: '存储监控',
      icon: 'shujukufengxianjiankong'
    }, {
      path: 'HadoopMonitor002',
      component: Ganglia,
      name: '服务器监控',
      icon: 'fuwuqineicunjiankong'
    }, {
      path: 'hadoopmonitor004',
      component: JettyMonitor,
      name: 'web服务器',
      icon: 'WEBgongjijiankong'
    }]
  }]
}, {
  path: '/systemmanagemenu',
  component: Layout,
  name: '系统管理',
  redirect: '/systemmanagemenu/dictionary',
  icon: 'guanli',
  children: [{
    path: 'dictionary',
    component: Dictionary,
    name: '数据字典',
    icon: 'shujuzidian'
  }, {
    path: 'serverconfig',
    component: ServerConfig,
    name: '服务器配置',
    icon: 'fuwuqipeizhiwenjian'
  }, {
    path: '/systemmanagemenu/alarmconfig',
    name: '异常报警配置',
    component: Wrap,
    children: [{
      path: 'alarmconfig001',
      component: AlarmRule,
      name: '报警规则',
      icon: 'baojingguanli'
    }, {
      path: 'alarmconfig002',
      component: AlarmMould,
      name: '报警模板',
      icon: 'baojingguanli1'
    }]
  }, {
    path: 'errorcode',
    component: ErrorCode,
    name: '错误代码管理',
    icon: 'icon-test'
  }]
}, {
  path: '/systembackupmenu',
  component: Layout,
  name: '系统备份',
  redirect: '/systembackupmenu/resourcbackup',
  icon: 'beifenguanli',
  children: [{
    path: 'resourcbackup',
    component: ResourceBackup,
    name: '资源数据备份',
    icon: 'shujuhuifu'
  }, {
    path: 'appbackup',
    component: AppBackup,
    name: '应用备份',
    icon: 'iconfontyunbeifen'
  }, {
    path: 'cachereply',
    component: CacheReply,
    name: '缓存恢复',
    icon: 'redo'
  }]
}];
