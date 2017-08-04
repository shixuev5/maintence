import fetch from '@/utils/fetch';
import config from '@/config';

function fetchDictionary(filter, pageIndex, pageSize = 10) {
  return fetch.post(`${config.usercenter}dictionary/getbycondition/${pageIndex}/${pageSize}`, filter, {
    description: '数据字典查询'
  });
}

function fetchDictionaryById(id) {
  return fetch.get(`${config.maintence}dictionary/getbyparentid/${id}`, { id }, {
    description: '数据字典查询'
  });
}

function fetchDictionaryByType(typeArray) {
  return fetch.post(`${config.usercenter}dictionary/getdictionarybytypes`, typeArray, {
    description: '查询数字字典'
  });
}

export {
  fetchDictionary,
  fetchDictionaryById,
  fetchDictionaryByType
};
