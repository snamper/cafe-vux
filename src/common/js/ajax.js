import axios from 'axios';
import { url } from './consts';
import Logger from 'chivy';
const log = new Logger('common/js/ajax');

function ajaxPost(url, param, flag) {
  return new Promise((resolve, reject) => {
    log.debug('The ajax post url is (' + url + ') and post data is (' + JSON.stringify(param) + ')');
    axios.post(url, param).then((response) => {
      const result = response.data;
      log.debug('The response data is ' + JSON.stringify(result));
      if (result === null) {
          reject(new Error('The post url(' + url + ') response is failed'));
      } else if (result !== null && flag !== null && result.flag) {
          reject(new Error('The post url(' + url + ') response is failed due to ' + flag + ' is incorrect'));
      } else {
          resolve(result);
      }
    }).catch((error) => {
      log.error(JSON.stringify(error));
      reject(new Error('The post url(' + url + ') is failed'));
    });
  });
}

function ajaxGet(url, flag) {
  return new Promise((resolve, reject) => {
    log.debug('The ajax get url is (' + url + ').');
    axios.get(url).then((response) => {
      const result = response.data;
      // log.debug('The response data is ' + JSON.stringify(result));
      if (result === null) {
          reject(new Error('The get url(' + url + ') response is failed'));
      } else if (result !== null && flag !== null && result.flag) {
          reject(new Error('The get url(' + url + ') response is failed due to ' + flag + ' is incorrect'));
      } else {
          resolve(result);
      }
    }).catch((error) => {
      log.error(JSON.stringify(error));
      reject(new Error('The post url(' + url + ') is failed'));
    });
  });
}

function getCategoriedProducts() {
  return ajaxGet(url.getCategoriedProducts, arguments[0] ? arguments[0] : null);
}

function getRecordList(param) {
  return ajaxPost(url.getRecordList, param, arguments[1] ? arguments[1] : null);
}

function isExistUserName(param) {
  return ajaxPost(url.isExistUserName, param, arguments[1] ? arguments[1] : null);
}

function memberLogin(param) {
  return ajaxPost(url.memberLogin, param, arguments[1] ? arguments[1] : null);
}

function createMember(param) {
  return ajaxPost(url.createMember, param, arguments[1] ? arguments[1] : null);
}

function saveRecordList(param) {
  return ajaxPost(url.saveRecordList, param, arguments[1] ? arguments[1] : null);
}

function alterStatus(param) {
  return ajaxPost(url.alterStatus, param, arguments[1] ? arguments[1] : null);
}

function modifyBasicInfo(param) {
  return ajaxPost(url.modifyBasicInfo, param, arguments[1] ? arguments[1] : null);
}

function modifyPassword(param) {
  return ajaxPost(url.modifyPassword, param, arguments[1] ? arguments[1] : null);
}

function getMemberById(param) {
  return ajaxPost(url.getMemberById, param, arguments[1] ? arguments[1] : null);
}

function getAddresses(param) {
  return ajaxPost(url.getAddresses, param, arguments[1] ? arguments[1] : null);
}

function saveAddresses(param) {
  return ajaxPost(url.saveAddresses, param, arguments[1] ? arguments[1] : null);
}

function deleteAddresses(param) {
  return ajaxPost(url.deleteAddresses, param, arguments[1] ? arguments[1] : null);
}

export { getCategoriedProducts, getRecordList, isExistUserName, memberLogin, getAddresses, saveAddresses, deleteAddresses };
export { createMember, saveRecordList, alterStatus, modifyBasicInfo, modifyPassword, getMemberById };
