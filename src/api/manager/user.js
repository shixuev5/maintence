import fetch from '@/utils/fetch';
import config from '@/config';
import store from '@/store';


function fetchOrganize() {
  return fetch.get(`${config.usercenter}organize/getbyid/0/${store.getters.orgId}`, {
    description: '查询组织机构'
  });
}

function fetchUserList(keyword = '', orgid = '', pageIndex, pageSize) {
  return fetch.post(`${config.usercenter}user/getuserbycondition/${pageIndex}/${pageSize}`, { keyword, orgid }, {
    description: '查询用户列表'
  });
}

function addUser(data) {
  return fetch.post(`${config.usercenter}user/insertex`, data, {
    description: '新增用户'
  });
}

function updateUser(data) {
  return fetch.post(`${config.usercenter}user/updateex`, data, {
    description: '更新用户信息'
  });
}

function deleteUsers(idsArray) {
  return fetch.post(`${config.usercenter}user/deleteuser`, idsArray, {
    description: '删除用户'
  });
}

export {
  fetchOrganize,
  fetchUserList,
  addUser,
  updateUser,
  deleteUsers
};
