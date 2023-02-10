const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

// Session模型
const SessionModel = require("../models/Session");
// User模型
const UserModel = require("../models/User");

// 登录
exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const users = await UserModel.getData();
  const user = users.find(
    (item) => item.username === username && item.password === password
  );

  // 登录失败
  if (!user) {
    throw new Error("username or password error!");
  }

  // 登录成功
  // 生成Token
  const token = user?.id + "------" + uuidv4(); // todo 理论上需要加密

  const maxAge = 1 * 24 * 60 * 60 * 1000; // 有效期ms

  const auth = {
    userId: user.id,
    token, // todo 理论上需要加密
    expireTime: moment().valueOf() + maxAge,
  };
  await addAuth(auth);

  // 浏览器
  res.cookie("token", token, {
    path: "/",
    domain: "localhost",
    maxAge, // 毫秒数
  });
  // 兼容其他场景
  res.header("authorization", token);

  return auth;
};

// 退出登录
exports.logout = async (req, res, next) => {
  const token = req.token;
  return await deleteAuth(token);
};

// 获取用户信息
exports.getUser = async (req, res, next) => {
  const token = req.token;
  const auths = await SessionModel.getData();
  const userId = auths.find((item) => item.token === token)?.userId;

  const users = await UserModel.getData();
  return users.find((item) => item.id === userId);
};

/**
 * 添加认证
 * @param {*} authObj
 */
async function addAuth(authObj) {
  const auths = await SessionModel.getData();
  const index = auths.findIndex((item) => item.userId === authObj.userId);
  if (index !== -1) {
    auths[index] = authObj;
  } else {
    auths.push(authObj);
  }
  await SessionModel.updateData(auths);
}

/**
 * 删除认证
 * @param {*} token
 */
async function deleteAuth(token) {
  let auths = await SessionModel.getData();
  auths = auths.filter((item) => item.token !== token);
  await SessionModel.updateData(auths);
}
