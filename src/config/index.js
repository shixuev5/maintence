// const baseUrl = 'http://192.168.1.68:8080/';
const baseUrl = 'http://gisapi.ngrok.cc/';

export default {
  env: `${baseUrl}development`,
  usercenter: `${baseUrl}user-center/`,
  maintence: `${baseUrl}maintence/`,
  message: `${baseUrl}message-center/`,
  resource: `${baseUrl}resource/`,
  socket: baseUrl
};
