import fetch from '@/utils/fetch';
import config from '@/config';
import store from '@/store';

function fetchMessage() {
  return fetch.get(`${config.message}messagebusiness/unreadtotal/${store.getters.userName}`);
}

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

function fetchMsgList(filter) {
  return fetch.post(`${config.message}messagebusiness/findpagelist`, filter, {
    description: '获取消息列表'
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
    fetchMessage,
    sendMessage,
    fetchMsgList,
    markRead,
    deleteMessage
};
