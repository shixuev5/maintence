import fetch from '@/utils/fetch';
import config from '@/config';
import store from '@/store';

function viewResource() {
  return fetch.post(`${config.maintence}platformresources/querybyorganizeid/${store.getters.user.orgid}`, {
    description: '查询平台资源'
  });
}

function allocatResource(data) {
  // const data = [{
  //     'organizeid': 'b47731b7376ef85ac553c776e73effc3',
  //     'relation': 0,
  //     'clouddisk': 1
  // }];
  return fetch.post(`${config.userCenter}platformresources/recoveryorgallotsize`, data);
}

export {
  viewResource,
  allocatResource
};
