import fetch from '@/utils/fetch';
import config from '@/config';
import store from '@/store';

function sendMessage(msg) {
  const data = {
    typeId: '00000000-0000-0000-0000-000000000000',
    sentType: '1',
    sendId: store.getters.userId,
    ...msg
  };
  return fetch.post(`${config.message}messagebusiness/sendmessage`, data, {
    description: '发送站内信'
  });
}

function fetchMessage(filter, pageIndex, pageSize = 10) {
  return fetch.post(`${config.message}messagebusiness/findpagelist`, {
    objCondition: {
      ...filter
    },
    pageIndex,
    pageSize
  });
}

function markRead(data) {
  return fetch.post(`${config.message}messagebusiness/batchread/1`, data, {
    description: '标记信息已读'
  });
}

function deleteMessage(data) {
  return fetch.post(`${config.message}messagebusiness/deletebyids`, data, {
    description: '删除消息'
  });
}

export {
  sendMessage,
  fetchMessage,
  markRead,
  deleteMessage
};
