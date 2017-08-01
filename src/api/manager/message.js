import fetch from '@/utils/fetch';
import config from '@/config';
import store from '@/store';


function fetchReceiver(keyword = '', pageIndex = 1, pageSize = 20) {
  return fetch.post(`${config.usercenter}user/getuserlistinfobycondition/${pageIndex}/${pageSize}`, {
    keyword,
    orgid: store.getters.orgId
  }, {
    description: '查询收信人'
  });
}

function sendMessage(receiveId, title, content) {
  return fetch.post(`${config.message}messagebusiness/sendmessage`, {
    typeId: store.getters.orgId,
    sentType: 1,
    sendId: store.getters.userId,
    receiveId,
    title,
    content
  }, {
    description: '发送站内信'
  });
}

export {
  fetchReceiver,
  sendMessage
};
