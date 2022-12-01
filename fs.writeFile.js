/*
 * @Author: QinJiu
 * @Date: 2022-12-01 16:30:29
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-12-01 16:43:49
 * @Description: -
 */
const os = require("os");
const fs = require("fs/promises");

const path = require("path");

console.log(__dirname);
// console.log(os.EOL);

async function printFileContent(fileName, options = "utf-8") {
  const content = await fs.readFile(fileName, options);
  console.log(content);
}

// todo
function generateSignalReq(func) {
  let controller;
  return function (...args) {
    controller && controller.abort();

    controller = new AbortController();
    const { signal } = controller;

    return func.call(null, ...args, { signal });
  };
}

const myWriteFile = generateSignalReq(fs.writeFile);

async function test() {
  console.log("test");
  try {
    const fileName = path.resolve(__dirname, "./mysql/user.json");

    const json = await fs.readFile(fileName, "utf-8");

    const jsonData = JSON.parse(json);

    const key = Math.floor(Math.random() * 1000);
    jsonData[key] = 'abc' + key;

    const newContent = JSON.stringify(jsonData);

    await fs.writeFile(fileName, newContent);

    // 打印文件内容
    printFileContent(fileName);
  } catch (error) {
    console.log("error:", error.name);
  }
}

test();

// setTimeout(() => {
//   test();
// }, 2000);

// setTimeout(() => {
//   test();
// }, 4000);
