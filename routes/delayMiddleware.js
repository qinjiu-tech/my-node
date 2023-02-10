/**
 * 延时中间件
 */
const { delay } = require("./../utils/index");

module.exports = async (req, res, next) => {
  await delay(200);
  next();
};
