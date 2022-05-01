/* eslint-disable no-param-reassign */
/* eslint-disable no-void */
/* eslint-disable no-cond-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-rest-params */
import 'antd/es/message/style';
import _message from 'antd/es/message';
import axios from 'axios';
import NProgress from 'nprogress';
import isEmpty from 'lodash/isEmpty';
import 'nprogress/nprogress.css';

const instance = axios.create({
  timeout: 10000,
  // 超时时间10秒
  withCredentials: true,
  // 表示跨域请求时是否需要使用凭证
  // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [
    function (data) {
      const config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // 页面请求Headers增加打标信息
      config.common = Object.assign(
        {
          'Axe-Page': window.location.href || 'unkown',
        },
        config.common || {},
      ); // 对 data 进行任意转换处理

      let ret = [];

      if (isEmpty(data)) {
        return ret;
      }

      const requestDataType = data.requestDataType || 'JSON';
      delete data.requestDataType;

      if (requestDataType === 'FormData') {
        ret = new FormData();
        Object.keys(data).forEach((key) => {
          if (typeof data[key] !== 'undefined') {
            ret.append(key, data[key]);
          }
        });
        return ret;
      } else if (requestDataType === 'JSON') {
        config['Content-Type'] = 'application/json';
        return JSON.stringify(data);
      }

      if (data.objectString) {
        Object.keys(data).forEach((key) => {
          if (data[key]) {
            if (key === 'objectString') {
              ret.push('objectString='.concat(encodeURIComponent(JSON.stringify(data.objectString))));
            } else {
              ret.push(''.concat(key, '=').concat(data[key]));
            }
          }
        });
      } else {
        ret.push(''.concat('objectString='.concat(encodeURIComponent(JSON.stringify(data)))));
      }

      ret = ret.join('&');
      return ret;
    },
  ],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function (response) {
      return response;
    },
  ],
}); // 添加请求拦截器

instance.interceptors.request.use(
  (config) => {
    !config.limitProgress && NProgress.start();
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
); // 添加获取截器

instance.interceptors.response.use(
  (response) => {
    let _response$config;
    let _response$config$head;

    // 进度条
    !response.config.limitProgress && NProgress.done(); // 是否接管报错提示

    const requestMessage = (_response$config = response.config) === null || _response$config === void 0 ? void 0 : (_response$config$head = _response$config.headers) === null || _response$config$head === void 0 ? void 0 : _response$config$head.requestMessage; // 数据json化处理

    let { data } = response;

    try {
      let _response$request2;

      if (typeof data === 'string') {
        if (/<!DOCTYPE html>/gi.test(data)) {
          let _response$request;

          // eslint-disable-next-line no-return-assign
          return {
            code: '401',
            success: false,
            data,
            message: '登入信息失效！',
            responseURL: response === null || response === void 0 ? void 0 : (_response$request = response.request) === null || _response$request === void 0 ? void 0 : _response$request.responseURL,
          };
        } else {
          data = JSON.parse(data);
        }
      }

      if (!['200', '0'].includes(String(data.code)) && !requestMessage) {
        _message.error(data.message || '服务异常！');
      }

      data.responseURL = response === null || response === void 0 ? void 0 : (_response$request2 = response.request) === null || _response$request2 === void 0 ? void 0 : _response$request2.responseURL;
      return data;
    } catch (error) {
      console.error(error);
      !requestMessage && _message.error('服务异常！');
      return data;
    }
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);
export default instance;
