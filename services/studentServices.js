const { v4: uuidv4 } = require("uuid");
const { getCurDateTime } = require("../utils/index");

// 学生模型
const Student = require("./../models/Student");

// 增
// 新增学生
exports.addStudent = async (obj) => {
  obj = {
    ...obj,
    id: uuidv4(),
    createTime: getCurDateTime(),
  };
  const data = await Student.getData();
  data.push(obj);
  await Student.updateData(data);
  return obj;
};

// 删
// 删除单个学生
exports.deleteStudent = async (id) => {
  let data = await Student.getData();
  data = data.filter((item) => item.id !== id);
  return await Student.updateData(data);
};
// 删除多个学生
exports.deleteStudents = async (ids) => {
  let data = await Student.getData();

  data = data.filter((item) => !ids.includes(item.id));
  return await Student.updateData(data);
};

// 改
// 修改学生
exports.updateStudent = async (obj) => {
  const data = await Student.getData();
  
  const index = data.findIndex((item) => item.id === obj.id);
  data[index] = { ...data[index], ...obj, updateTime: getCurDateTime() };
  return await Student.updateData(data);
};

// 查
// 获取学生详情
exports.getStudent = async (id) => {
  const data = await Student.getData();
  return data.find((item) => item.id === id);
};
// 获取学生列表
exports.getStudents = async ({ page, limit }) => {
  const data = await Student.getData();

  page = page ?? 1;
  limit = limit ?? 10;
  const list = data.slice((page - 1) * limit, limit);
  return {
    list,
    total: data.length,
  };
};
