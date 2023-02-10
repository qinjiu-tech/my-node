const express = require("express");
const router = express.Router();
const stuServ = require("../../services/studentServices");
const { asyncHandler } = require("../resUtil");

// 查询学生列表
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    return await stuServ.getStudents(req.query);
  }, "查询学生列表成功！")
);

// 查询学生详情
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    return await stuServ.getStudent(req.params.id);
  })
);

// 添加学生
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    return await stuServ.addStudent(req.body);
  }, "新增成功！")
);

// 删除多个学生
router.delete(
  "/",
  asyncHandler(async (req, res, next) => {
    return await stuServ.deleteStudents(req.body.ids);
  }, "删除成功！")
);

// 删除单个学生
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    return await stuServ.deleteStudent(req.params.id);
  })
);

// 修改学生
router.put(
  "/",
  asyncHandler(async (req, res, next) => {
    return await stuServ.updateStudent(req.body);
  }, "修改成功！")
);

module.exports = router;
