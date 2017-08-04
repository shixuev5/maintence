import fetch from '@/utils/fetch';
import config from '@/config';
import store from '@/store';

function fetchOperateLog(filter, pageIndex, pageSize = 10) {
  return fetch.post(`${config.maintence}maintenceoperationlog/querybyfilter/${pageIndex}/${pageSize}`, filter, {
    description: '运维日志查询'
  });
}

function downloadOperateLog(fileds, filter) {
  fetch.post(`${config.maintence}maintenceoperationlog/export`, { fileds, filter })
    .then(response => window.open(`${config.maintence}download/excel/${response.data}.xls`));
}

function fetchServiceLog(filter, pageIndex, pageSize = 10) {
  return fetch.post(`${config.maintence}serviceoperationstatistic/queryfilter/${store.getters.userId}`, {
    pageIndex,
    pageSize,
    ...filter
  }, {
    description: '服务日志查询'
  });
}

function downloadServiceLog(fileds, filter) {
  fetch.post(`${config.maintence}serviceoperationstatistic/export/${store.getters.userId}`, { fileds, filter })
    .then(response => window.open(`${config.maintence}download/excel/${response.data}.xls`));
}

function fetchPlatformLog(filter, pageIndex, pageSize = 10) {
  return fetch.post(`${config.maintence}platformrunninglog/querybydate`, {
    pageIndex,
    pageSize,
    ...filter
  }, {
    description: '平台日志查询'
  });
}

function downloadPlatformLog(fileds, filter) {
  fetch.post(`${config.maintence}platformrunninglog/export`, { fileds, filter })
    .then(response => window.open(`${config.maintence}download/excel/${response.data}.xls`));
}

function fetchHadoopLog(filter, pageIndex, pageSize = 10) {
  return fetch.post(`${config.maintence}hadooplog/querylogs`, {
    pageIndex,
    pageSize,
    ...filter
  }, {
    description: 'Hadoop日志查询'
  });
}

function fetchHadoopNode() {
  return fetch.post(`${config.maintence}hadooplog/querynodes`, {}, {
    description: 'Hadoop节点查询'
  });
}

function downloadHadoopLog(fileds, filter) {
  fetch.post(`${config.maintence}hadooplog/export`, { fileds, ...filter })
    .then(response => window.open(`${config.maintence}download/excel/${response.data}.xls`));
}

function fetchErrorLog(filter, pageIndex, pageSize) {
  return fetch.post(`${config.resource}serviceserrorlogview/findpagelist`, {
    pageIndex,
    pageSize,
    objCondition: {
      ...filter
    }
  }, {
    description: '错误日志查询'
  });
}

function fetchErrorType() {
  return fetch.post(`${config.maintence}errorcode/type/findall`, {}, {
    description: '错误类别查询'
  });
}

function downloadErrorLog(fileds, filter) {
  fetch.post(`${config.maintence}errorcode/log/export`, { fileds, ...filter })
    .then(response => window.open(`${config.maintence}download/excel/${response.data}.xls`));
}

export {
  fetchOperateLog,
  downloadOperateLog,
  fetchServiceLog,
  downloadServiceLog,
  fetchPlatformLog,
  downloadPlatformLog,
  fetchHadoopLog,
  fetchHadoopNode,
  downloadHadoopLog,
  fetchErrorLog,
  fetchErrorType,
  downloadErrorLog
};
