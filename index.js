/*
 * @Author: QinJiu
 * @Date: 2022-12-05 16:41:01
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-12-12 16:38:18
 * @Description: -
 */
const moment = require("moment");
const os = require("os");
const fs = require("fs");

const path = require("path");

// // 直接读取复制
// async function copyFileMethod1() {
//   console.time("方式1：");

//   const from = path.resolve(__dirname, "./mysql/xmind.zip");
//   const to = path.resolve(__dirname, "./mysql/xmind1.zip");

//   const contents = await fs.promises.readFile(from);

//   await fs.promises.writeFile(to, contents);

//   console.timeEnd("方式1：");
// }

// copyFileMethod1();

// // 手动解决背压
// async function copyFileMethod2() {
//   console.time("方式2：");

//   const from = path.resolve(__dirname, "./mysql/xmind.zip");
//   const to = path.resolve(__dirname, "./mysql/xmind2.zip");

//   const rs = fs.createReadStream(from);
//   const ws = fs.createWriteStream(to);

//   let flag = true;
//   rs.on("data", (chunk) => {
//     flag = ws.write(chunk);
//     if (!flag) {
//       rs.pause();
//     }
//   });

//   ws.on("drain", () => {
//     rs.resume();
//   });

//   rs.on("end", () => {
//     ws.end();
//   });

//   ws.on("close", () => {
//     console.timeEnd("方式2：");
//   });
// }

// copyFileMethod2();

// pipe自动管理文件流
async function copyFileMethod3() {
  console.time("方式3：");

  const from = path.resolve(__dirname, "./mysql/xmind.zip");
  const to = path.resolve(__dirname, "./mysql/xmind3.zip");

  const rs = fs.createReadStream(from);
  const ws = fs.createWriteStream(to);

  rs.pipe(ws);

  // rs.on("end", () => {
  //   ws.end();
  // });

  // ws.on("finish", () => {
  //   console.log("写入完成！")
  // })

  ws.on("close", () => {
    console.timeEnd("方式3：");
  });
}

copyFileMethod3();
