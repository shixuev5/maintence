import fetch from '@/utils/fetch';
import config from '@/config';
import store from '@/store';


function fetchOrganize() {
  return fetch.get(`${config.usercenter}organize/getbyid/0/${store.getters.user.orgid}`, {
    description: '查询组织机构'
  });
}

function fetchUserList(keyword = '', orgid = '', pageIndex, pageSize) {
  return fetch.post(`${config.usercenter}user/getuserbycondition/${pageIndex}/${pageSize}`, {
    keyword,
    orgid
  });
}

export {
  fetchOrganize,
  fetchUserList
};
