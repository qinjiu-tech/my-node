/*
 * @Author: QinJiu
 * @Date: 2022-12-05 16:41:01
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-12-06 17:28:01
 * @Description: -
 */
const moment = require("moment");
const os = require("os");
const fs = require("fs");

const path = require("path");

const filePath = path.resolve(__dirname, "./mysql/1.txt");

// 文件可读流
const ws = fs.createWriteStream(filePath, {
  encoding: "utf-8",
  // w: 写入并覆盖    a: 追加
  flags: "a", // 写
  autoClose: true, // 调用end方法后自动关闭
  highWaterMark: 10, // 每次写入的最大字节
});

ws.on("close", () => {
  console.log("可写流已关闭！");
});

ws.on("finish", () => {
  console.log("写入完成！");
});

ws.on("error", (error) => {
  console.log("写入错误：", error);
});

for (let i = 1; i <= 10; i++) {
  const chunk = "bbb";
  // 下次写入是否需要等待（写入流管道已占满）
  const flag = ws.write(chunk, () => {
    console.log(`第${i}次写入`);
  });
  console.log(flag);
}

// let i = 0;
// // 一直写，直到到达上限，或无法再直接写入
// function write() {
//   let flag = true;
//   while (i < 1024 * 1024 * 10 && flag) {
//     flag = ws.write("a"); //写入a，得到下一次还能不能直接写
//     i++;
//   }
// }

// write();

// 可写流通道拥堵，恢复写入时触发
ws.on("drain", () => {
  console.log("恢复写入！");
  // write();
});
