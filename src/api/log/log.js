import fetch from '@/utils/fetch';
import config from '@/config';
import store from '@/store';

function fetchOperateLog(filter, pageIndex, pageSize = 10) {
  return fetch.post(`${config.maintence}maintenceoperationlog/querybyfilter/${pageIndex}/${pageSize}`, filter);
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
  });
}

function downloadHadoopLog(fileds, filter) {
  fetch.post(`${config.maintence}hadooplog/export`, { fileds, ...filter })
    .then(response => window.open(`${config.maintence}download/excel/${response.data}.xls`));
}

function fetchErrorLog(filter, pageIndex, pageSize) {
  return fetch.post(`${config.maintence}errorcode/log/query/${pageIndex}/${pageSize}`, filter);
}

export {
  fetchOperateLog,
  downloadOperateLog,
  fetchServiceLog,
  downloadServiceLog,
  fetchPlatformLog,
  downloadPlatformLog,
  fetchHadoopLog,
  downloadHadoopLog,
  fetchErrorLog
};
