import fetch from '@/utils/fetch';
import config from '@/config';
import store from '@/store';

function fetchOperateLog(filter, pageIndex, pageSize = 10) {
  return fetch.post(`${config.maintence}maintenceoperationlog/querybyfilter/${pageIndex}/${pageSize}`, filter);
  // return fetch.get('/src/mock/operateLog.json');
}

function fetchServiceLog(filter) {
  return fetch.post(`${config.maintence}serviceoperationstatistic/queryfilter/${store.getters.userId}`, filter);
}

function fetchPlatformLog(filter) {
  return fetch.post(`${config.maintence}platformrunninglog/querybydate`, filter);
}

function fetchHadoopLog(filter) {
  return fetch.post(`${config.maintence}hadooplog/querylogs`, filter);
}

function fetchErrorLog(filter, pageIndex, pageSize) {
  return fetch.post(`${config.maintence}errorcode/log/query/${pageIndex}/${pageSize}`, filter);
}

export {
  fetchOperateLog,
  fetchServiceLog,
  fetchPlatformLog,
  fetchHadoopLog,
  fetchErrorLog
};
