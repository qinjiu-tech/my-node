const moment = require("moment");
const os = require("os");
const fs = require("fs/promises");

const path = require("path");

console.log(__dirname);
// console.log(os.EOL);

async function isExists(filePath) {
  try {
    // 可访问性
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

async function test() {
  try {
    const filePath = path.resolve(__dirname, "./mysql/d");
    const exists = await isExists(filePath);
    if (exists) {
      throw new Error("文件已存在！");
    } else {
      await fs.mkdir(filePath);
    }
  } catch (error) {
    console.log(error);
  }
}

test();
