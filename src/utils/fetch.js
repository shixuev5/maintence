import axios from 'axios';
import store from '@/store';
import LoadingBar from 'iview/src/components/loading-bar';
import Message from 'iview/src/components/message';

function validateStatus(status) {
  return status >= 200 && status < 300; // default
}

const fetch = axios.create({
  validateStatus,
  timeout: 2500,
  withCredentials: false
});

fetch.interceptors.request.use(config => {
  LoadingBar.start();
  if (config.description) {
    config.headers.common['User-Operation-Info'] = encodeURIComponent(`${store.getters.userId},${store.getters.token},${store.getters.currentPerm.id},${config.description},${store.getters.currentPerm.bpname},${store.getters.parentPerm.bpname}`);
  }
  return config;
}, error => {
  LoadingBar.error();
  if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  return Promise.reject(error);
});

fetch.interceptors.response.use(response => {
  if (validateStatus(response.data.statusCode)) {
    response.data = response.data.data;
    LoadingBar.finish();
    return response;
  }
  Message.error(response.data.message);
  return Promise.reject({
    message: response.data.message
  });
}, error => {
  LoadingBar.error();
  if (error.response) {
    Message.error(`${error.response.status} ${error.response.statusText}`);
  } else if (error.message) {
    Message.error(error.message);
  }
  return Promise.reject(error);
});

export default fetch;
