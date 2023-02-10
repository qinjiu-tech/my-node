const express = require("express");
const router = express.Router();
const adminServ = require("../../services/adminServices");
const { asyncHandler } = require("../resUtil");
const jwt = require("./../jwt");
const { COOKIE_KEY } = require("../../utils/consts");

// 登录
router.post(
  "/login",
  asyncHandler(
    async (req, res, next) => {
      const user = await adminServ.login(req, res, next);
      const token = jwt.publish(user, res);
      delete user.password;
      return {
        token,
        user,
      };
    },
    "登录成功!",
    200
  )
);

// 获取用户信息
router.get(
  "/whoami",
  asyncHandler(
    async (req, res, next) => {
      return await adminServ.getUser(req, res, next);
    },
    "获取用户信息成功！",
    200
  )
);

// 退出登录
router.post(
  "/logout",
  asyncHandler(async (req, res, next) => {
    // return await adminServ.logout(req, res, next);
    // 清除cookie
    res.clearCookie(COOKIE_KEY);
    // 重定向页面
    res.redirect("https://www.baidu.com/");
  })
);

module.exports = router;
