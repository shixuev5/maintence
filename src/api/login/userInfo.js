import fetch from '@/utils/fetch';
import config from '@/config';
import store from '@/store';
import md5 from 'js-md5';

function savePasswd(oldPasswd, newPasswd) {
  return fetch.post(`${config.usercenter}user/updatepassword`, {
    id: store.getters.userId,
    no: md5(newPasswd),
    password: md5(oldPasswd)
  });
}

function saveAvatar() {
  return fetch.post(`${config.usercenter}contact/update/${store.getters.userId}`, {
    imguri: store.getters.user.imguri
  });
}

export {
   savePasswd,
   saveAvatar
};
