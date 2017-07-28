import fetch from '@/utils/fetch';
import config from '@/config';
import md5 from 'js-md5';

function login(name, password) {
  const data = {
    name,
    password: md5(password)
  };
  return fetch.post(`${config.usercenter}user/login`, data);
  // return fetch.get('/src/mock/user.json');
}

function getPerms(id) {
  return fetch.get(`${config.usercenter}user/getperm/${id}`);
  // return fetch.get('/src/mock/perms.json');
}

export {
    login,
    getPerms
};
