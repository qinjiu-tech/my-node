/*
 * @Author: QinJiu
 * @Date: 2022-12-01 15:04:46
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-12-01 15:09:28
 * @Description: -
 */
const fs = require("fs/promises");

const path = require("path");

console.log(__dirname);

async function test() {
  const fileName = path.resolve(__dirname, "./mysql/1.txt");
  const options = {
    encoding: "utf-8",
  };
  const content = await fs.readFile(fileName, options);
  console.log(content);
}

test();
