import Login from '@/views/login/login';
import ResourceAllocat from 'views/resource/allocat';

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

const RegularTasks = () =>
  import('views/taskmenu/regularTasks');

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
  icon: 'ios-pie',
  children: [{
    path: 'resourceallocat',
    component: ResourceAllocat,
    name: '资源分配',
    icon: 'ios-pie'
  }, {
    path: 'resourceview',
    component: ResourceView,
    name: '资源查看',
    icon: 'ios-pie'
  }, {
    path: 'resourcerecover',
    component: ResourceRecover,
    name: '资源回收',
    icon: 'ios-pie'
  }]
}, {
  path: '/securitymenu',
  component: Layout,
  name: '安全管理',
  redirect: '/securitymenu/usermanage',
  icon: 'person-stalker',
  children: [{
    path: 'usermanage',
    component: UserManage,
    name: '用户管理',
    icon: 'person-stalker'
  }, {
    path: 'groupmanage',
    name: '群组管理',
    redirect: '/securitymenu/groupmanage/groupmanage001',
    icon: 'person-stalker',
    children: [{
      path: 'groupmanage001',
      component: OrganizeManager,
      name: '组织机构管理',
      icon: 'person-stalker'
    },
    {
      path: 'groupmanage002',
      component: PostManager,
      name: '岗位信息管理',
      icon: 'person-stalker'
    }
    ]
  }, {
    path: 'rightmanage',
    name: '权限管理',
    redirect: '/securitymenu/rightmanage/rightmanage001',
    icon: 'person-stalker',
    children: [{
      path: 'rightmanage001',
      component: ResourceAllocat,
      name: '功能权限',
      icon: 'person-stalker'
    },
    {
      path: 'rightmanage002',
      component: ResourceAllocat,
      name: '数据/服务',
      icon: 'person-stalker'
    }
    ]
  }, {
    path: 'messagecenter',
    name: '消息管理',
    redirect: '/securitymenu/messagecenter/messagecenter001',
    icon: 'person-stalker',
    children: [{
      path: 'messagecenter001',
      component: MessageCenter,
      name: '消息中心',
      icon: 'person-stalker'
    },
    {
      path: 'messagecenter002',
      component: SendMessage,
      name: '站内信',
      icon: 'person-stalker'
    }
    ]
  }, {
    path: 'antispam',
    name: '反垃圾管理',
    redirect: '/securitymenu/antispam/antispam001',
    icon: 'person-stalker',
    children: [{
      path: 'antispam001',
      component: BlackList,
      name: '黑名单',
      icon: 'person-stalker'
    },
    {
      path: 'antispam002',
      component: WhiteList,
      name: '白名单',
      icon: 'person-stalker'
    }
    ]
  }]
}, {
  path: '/taskmenu',
  component: Layout,
  name: '任务管理',
  redirect: '/taskmenu/regulartasks',
  icon: 'person-stalker',
  children: [{
    path: 'regulartasks',
    component: RegularTasks,
    name: '定时任务管理',
    icon: 'person-stalker'
  }]
}, {
  path: '/logmanagemenu',
  component: Layout,
  name: '日志管理',
  redirect: '/logmanagemenu/operatelog',
  icon: 'person-stalker',
  children: [{
    path: 'operatelog',
    component: OperateLog,
    name: '运维操作日志',
    icon: 'person-stalker'
  }, {
    path: 'servicelog',
    component: ServiceLog,
    name: '服务运行日志',
    icon: 'person-stalker'
  }, {
    path: 'platformlog',
    component: PlatformLog,
    name: '平台运行日志',
    icon: 'person-stalker'
  }, {
    path: 'hadooplog',
    component: HadoopLog,
    name: 'Hadoop节点日志',
    icon: 'person-stalker'
  }, {
    path: 'errorlog',
    component: ErrorLog,
    name: '错误日志管理',
    icon: 'person-stalker'
  }]
}, {
  path: '/statmenu',
  component: Layout,
  name: '统计分析',
  redirect: '/statmenu/servicestat',
  icon: 'person-stalker',
  children: [{
    path: 'servicestat',
    component: ServiceState,
    name: '服务访问统计',
    icon: 'person-stalker'
  }, {
    path: 'visitstat',
    component: VisitState,
    name: '用户访问统计',
    icon: 'person-stalker'
  }, {
    path: 'webappstat',
    component: WebAppState,
    name: '平台应用统计',
    icon: 'person-stalker'
  }]
}, {
  path: '/platformmonitormenu',
  component: Layout,
  name: '平台监控',
  redirect: '/platformmonitormenu/webmonitor',
  icon: 'person-stalker',
  children: [{
    path: 'webmonitor',
    component: WebMonitor,
    name: 'Web容器监控',
    icon: 'person-stalker'
  }, {
    path: 'databasemonitor',
    component: DataBaseMonitor,
    name: '数据库监控',
    icon: 'person-stalker'
  }, {
    path: 'gismonitor',
    component: GISMonitor,
    name: 'GIS服务器监控',
    icon: 'person-stalker'
  }, {
    path: 'servicemonitor',
    component: ServiceMonitor,
    name: '服务监控',
    icon: 'person-stalker'
  }, {
    path: 'hadoopmonitor',
    name: '分布式平台管理',
    redirect: '/platformmonitormenu/hadoopmonitor/HadoopMonitor001',
    icon: 'person-stalker',
    children: [{
      path: 'HadoopMonitor001',
      component: HdfsMonitor,
      name: '分布式存储监控',
      icon: 'person-stalker'
    }, {
      path: 'HadoopMonitor002',
      component: Ganglia,
      name: '分布式服务器监控',
      icon: 'person-stalker'
    }, {
      path: 'hadoopmonitor004',
      component: JettyMonitor,
      name: '分布式web服务器',
      icon: 'person-stalker'
    }]
  }]
}, {
  path: '/systemmanagemenu',
  component: Layout,
  name: '系统管理',
  redirect: '/systemmanagemenu/dictionary',
  icon: 'person-stalker',
  children: [{
    path: 'dictionary',
    component: Dictionary,
    name: '数据字典',
    icon: 'person-stalker'
  }, {
    path: 'serverconfig',
    component: ServerConfig,
    name: '服务器配置',
    icon: 'person-stalker'
  }, {
    path: 'alarmconfig',
    name: '异常报警配置',
    icon: 'person-stalker',
    redirect: '/systemmanagemenu/alarmconfig/alarmconfig001',
    children: [{
      path: 'alarmconfig001',
      component: AlarmRule,
      name: '报警规则管理',
      icon: 'person-stalker'
    }, {
      path: 'alarmconfig002',
      component: AlarmMould,
      name: '报警信息模板管理',
      icon: 'person-stalker'
    }]
  }, {
    path: 'errorcode',
    component: ErrorCode,
    name: '错误代码管理',
    icon: 'person-stalker'
  }]
}, {
  path: '/systembackupmenu',
  component: Layout,
  name: '系统备份',
  redirect: '/systembackupmenu/resourcbackup',
  icon: 'person-stalker',
  children: [{
    path: 'resourcbackup',
    component: ResourceBackup,
    name: '资源数据备份',
    icon: 'person-stalker'
  }, {
    path: 'appbackup',
    component: AppBackup,
    name: '应用备份',
    icon: 'person-stalker'
  }, {
    path: 'cachereply',
    component: CacheReply,
    name: '缓存恢复',
    icon: 'person-stalker'
  }]
}];
