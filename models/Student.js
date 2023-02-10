/**
 * 定义模型
 * 模拟
 */
const path = require("path");
const fs = require("fs");

const filename = path.resolve(__dirname, "./../db/admin/student.json");

async function getData() {
  const content = await fs.promises.readFile(filename, "utf-8");
  return JSON.parse(content);
}

async function updateData(data = {}) {
  return await fs.promises.writeFile(filename, JSON.stringify(data));
}

module.exports = {
  getData,
  updateData,
};
