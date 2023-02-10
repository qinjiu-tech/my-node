/**
 * 权限中间件
 */
const { pathToRegexp } = require("path-to-regexp");
const { getError } = require("./resUtil");
const SessionModel = require("../models/Session");
const moment = require("moment");
const { getToken } = require("../utils/index");
const jwt = require("./jwt");

// // 需要认证的api
// const needTokenApi = [
//   {
//     methods: "GET",
//     path: "/api/admin/whoami",
//   },
//   {
//     methods: "POST",
//     path: "/api/admin/logout",
//   },
//   {
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     path: "/api/student",
//   },
// ];

// 无需认证的api
const whiteApiList = [
  {
    methods: ["POST"],
    path: "/api/admin/login",
  },
  {
    methods: ["GET", "POST"],
    path: "/api/file",
  },
];

/**
 * 判断该请求是否需要token
 * @param {*} req
 * @returns
 */
function isNeedToken(req) {
  // return !!needTokenApi.find((api) => {
  //   const reg = pathToRegexp(api.path);
  //   return api.methods.includes(req.method) && reg.test(req.path);
  // });

  const isWhite = !!whiteApiList.find((api) => {
    // const reg = pathToRegexp(api.path);
    // return api.methods.includes(req.method) && reg.test(req.path);
    return api.methods.includes(req.method) && req.path.startsWith(api.path);
  });

  return !isWhite;
}

/**
 * 校验token是否有效
 * @param {*} token
 * @returns
 */
async function validateToken(token) {
  // const datas = await SessionModel.getData();
  // return !!datas.find(
  //   (item) => item.token === token && moment().valueOf() <= item.expireTime
  // );
  return true;
}

module.exports = async function (req, res, next) {
  console.log(
    req.path,
    req.method,
    "params:",
    req.params,
    "query:",
    req.query,
    "body:",
    req.body
  );

  // 无需token
  if (!isNeedToken(req)) {
    next();
    return;
  }

  // 需要token
  try {
    // 验证
    const payload = jwt.verify(req, res, next);
    // 记录用户id
    req.userId = payload.id;
  } catch (error) {
    res.status(302).send(getError(error?.message, 302));
  }

  next();

  // const token = getToken(req);
  // // 无token
  // if (!token) {
  //   res.status(302).send(getError("No token, please log in first", 302));
  //   return;
  // }
  // // 有token
  // // token失效
  // if (!await validateToken(token)) {
  //   res.status(302).send(getError("This is an invalid token", 302));
  //   return;
  // }
  // // token有效
  // req.token = token;
  // next();
};
