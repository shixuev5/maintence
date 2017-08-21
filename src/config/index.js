const baseUrl = 'http://192.168.1.176:8080/';
// const baseUrl = 'http://gisserver.ngrok.cc/';

export default {
  env: `${baseUrl}development`,
  usercenter: `${baseUrl}user-center/`,
  maintence: `${baseUrl}maintence/`,
  message: `${baseUrl}message-center/`,
  resource: `${baseUrl}resource/`,
  socket: baseUrl
  // socket: 'http://gissocket.ngrok.cc'
};
