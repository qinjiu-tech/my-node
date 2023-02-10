const jwt = require("jsonwebtoken");
const { getToken } = require("../utils");
const { PRIVATE_KEY, COOKIE_KEY } = require("../utils/consts");

exports.publish = function publish(user, res) {
  const maxAge = 1 * 60 * 60; // 单位：s
  // 签名
  const token = jwt.sign(
    {
      id: user.id,
    },
    PRIVATE_KEY,
    {
      expiresIn: maxAge, // 到期时间 s
    }
  );

  //   设置cookie
//   res.cookie(COOKIE_KEY, token, {
//     maxAge: maxAge * 1000, // 有效期 ms
//     path: "/",
//   });
  // 设置其他传输
  // res.header("authorization", token);

  return token;

  // const [header, payload, signature] = token.split(".");
  // console.log([header, payload, signature]);

  // const atob = require("atob");
  // const btoa = require("btoa");

  // console.log(atob(header)); // 令牌类型 和 签名算法
  // console.log(atob(payload)); // 主体信息

  //   // 解密payload
  //   try {
  //     const decoded = jwt.verify(token, PRIVATE_KEY);
  //     console.log(decoded);
  //   } catch (error) {
  //     console.log(error);
  //   }
};

exports.verify = function verify(req) {
  const token = getToken(req);

  // auth认证
  // authorization: "bearer token"

  return jwt.verify(token, PRIVATE_KEY);
};
