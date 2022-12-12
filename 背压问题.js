/*
 * @Author: QinJiu
 * @Date: 2022-12-05 16:41:01
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-12-08 16:59:03
 * @Description: -
 */
const moment = require("moment");
const os = require("os");
const fs = require("fs");

const path = require("path");

const filePath = path.resolve(__dirname, "./mysql/1.txt");

// 文件可写流
const ws = fs.createWriteStream(filePath, {
  encoding: "utf-8",
  // w: 写入并覆盖    a: 追加
  flags: "w",
  autoClose: true, // 调用end方法后自动关闭('error' || 'finish'后自动关闭)
  emitClose: true, // 流销毁后是否发出close事件
  highWaterMark: 20, // 每次写入的最大字节
});

// 可写流事件
ws.on("open", () => {
  console.log("write：文件已打开！");
});

ws.on("close", () => {
  console.log("write：文件已关闭！");
});

// 写入10M数据测试速度
// function writeData() {
//   console.time();
//   let i = 1;
//   while (i <= 100 * 1024) {
//     ws.write("a");
//     i++;
//   }
//   ws.end(() => {
//     console.timeEnd();
//   });
// }

// writeData();

// 写入10M数据测试速度
function writeData() {
  console.time();

  let i = 0;
  function write() {
    let flag = true;
    while (i < 10 * 1024 && flag) {
      flag = ws.write("aaaaaaaaaa");
      i += 10;
    }
  }

  write();

  // 解决背压问题
  ws.on("drain", () => {
    // console.log("write：恢复写入！");
    write();
    if (i >= 100 * 1024) {
      console.timeEnd();
    }
  });
}

writeData();
