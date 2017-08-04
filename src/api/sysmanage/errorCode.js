import fetch from '@/utils/fetch';
import config from '@/config';
// import store from '@/store';

function fetchErrorCode(filter, pageIndex, pageSize = 10) {
  return fetch.post(`${config.maintence}errorcode/query/${pageIndex}/${pageSize}`, filter, {
    description: '错误代码查询'
  });
}

function updateErrorCode(data) {
  return fetch.post(`${config.maintence}errorcode/update`, data, {
    description: '错误代码更新'
  });
}

export {
  fetchErrorCode,
  updateErrorCode
};
