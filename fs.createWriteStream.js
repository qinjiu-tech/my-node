/*
 * @Author: QinJiu
 * @Date: 2022-12-05 16:41:01
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-12-08 16:37:37
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
  highWaterMark: 3, // 每次写入的最大字节
});

// 可写流事件
ws.on("open", () => {
  console.log("write：文件已打开！");
});

ws.on("close", () => {
  console.log("write：文件已关闭！");
});

ws.on("ready", () => {
  console.log("write：实例可以使用了！");
});

// 可写流通道拥堵，恢复写入时触发
ws.on("drain", () => {
  console.log("write：恢复写入！");
  write();
});

ws.on("finish", () => {
  console.log("write：finish！");
});

ws.on("error", () => {
  console.log("write：error！");
});

// 实例方法
// 结束写入
// ws.end(() => {
//   console.log("write：写入已结束！")
// })

// for (let i = 1; i <= 10; i++) {
//   const chunk = "aaa";
//   // 下次写入是否需要等待（写入流管道已占满）
//   const flag = ws.write(chunk, () => {
//     console.log(`第${i}次写入`);
//   });
//   if (i === 10) {
//     ws.end(() => {
//       console.log("write：写入已结束！");
//     });
//   }
// }

let i = 0;
// 一直写，直到到达上限，或无法再直接写入
// 写入10M数据
function write() {
  let flag = true;
  while (i < 10 && flag) {
    flag = ws.write("a", () => {
      if (i === 9) {
        ws.end();
      }
    }); // 得到下一次还能不能直接写
    console.log(i + 1);
    if (!flag) {
      console.log("通道已满！");
      // ws.destroy();
    }
    i++;
  }
}

write();
