/*
 * @Author: QinJiu
 * @Date: 2022-12-05 16:41:01
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-12-05 17:39:41
 * @Description: -
 */
const moment = require("moment");
const os = require("os");
const fs = require("fs");

const path = require("path");

const filePath = path.resolve(__dirname, "./mysql/1.txt");

// 文件可读流
const rs = fs.createReadStream(filePath, {
  encoding: "utf-8",
  // start: 1,
  // end: 3,
  highWaterMark: 3,
});

rs.on("close", () => {
  console.log("可读流已关闭！");
});

rs.on("data", (chunk) => {
  console.log("读取到的数据：", chunk);
  rs.pause();
  setTimeout(() => {
    rs.resume();
  }, 1000);
});

rs.on("end", () => {
  console.log("读取完毕！");
});

rs.on("error", (error) => {
  console.log("发生了错误：", error);
});

rs.on("pause", () => {
  console.log("暂停读取！");
});

rs.on("resume", () => {
  console.log("恢复读取！");
});
