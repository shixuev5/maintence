import fetch from '@/utils/fetch';
import config from '@/config';
import store from '@/store';


function fetchMessage(filter, pageIndex, pageSize = 10) {
  return fetch.post(`${config.message}messagebusiness/findpagelist`, {
    objCondition: {
      receiveId: store.getters.userName,
      ...filter
    },
    pageIndex,
    pageSize
  });
  // return fetch.get('/src/mock/message.json');
}

function markRead(ids) {
  return fetch.post(`${config.message}messagebusiness/batchread/1`, ids, {
    description: '标记信息已读'
  });
}

function deleteMessage(ids) {
  return fetch.post(`${config.message}messagebusiness/deletebyids`, ids, {
    description: '删除消息'
  });
}

export {
  fetchMessage,
  markRead,
  deleteMessage
};
