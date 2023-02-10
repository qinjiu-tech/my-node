const moment = require("moment");
const { DEFAULT_DATE_TIME_FORMAT } = require("../utils/consts");

/**
 * 延时函数
 * @param {number} duration
 * @returns
 */
exports.delay = function (duration = 1500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

/**
 * 获取当前的日期时间
 * @returns
 */
exports.getCurDateTime = function () {
  return moment().format(DEFAULT_DATE_TIME_FORMAT);
};

/**
 * 获取token
 */
exports.getToken = function (req) {
  // return req.cookies.token || req.headers.authorization;
  return req.headers.authorization;
};
