/**
 * 错误中间件
 */
const { getError } = require("./resUtil");

module.exports = (err, req, res, next) => {
  if (err) {
    const statusCode = typeof err?.code === "number" ? err?.code : 500; // 响应状态码
    res.status(statusCode).send(getError(err));
  } else {
    // 后续没有中间件时，express默认处理，404
    next();
  }
};
