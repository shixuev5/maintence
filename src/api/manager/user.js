import fetch from '@/utils/fetch';
import config from '@/config';
import store from '@/store';


function fetchOrganize() {
  return fetch.get(`${config.usercenter}organize/getbyid/0/${store.getters.orgId}`, {
    description: '查询组织机构'
  });
}

function fetchUserList(keyword = '', orgid = '', pageIndex, pageSize) {
  return fetch.post(`${config.usercenter}user/getuserbycondition/${pageIndex}/${pageSize}`, {
    keyword,
    orgid
  });
}

/**
 * 删除用户
 * @param {Array} ids 删除的用户id数组
 */
function deleteUsers(ids) {
  return fetch.post(`${config.usercenter}user/deleteuser`, JSON.stringify(ids), {
    description: '删除用户'
  });
}

export {
  fetchOrganize,
  fetchUserList,
  deleteUsers
};
