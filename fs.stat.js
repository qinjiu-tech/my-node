const moment = require("moment");
const os = require("os");
const fs = require("fs/promises");

const path = require("path");

console.log(__dirname);
// console.log(os.EOL);

async function test() {
  const fileName = path.resolve(__dirname, './mysql/user.json')
  const stats = await fs.stat(fileName);
  // console.log("文件信息：", stats);
  console.log("文件大小：", stats.size);
  console.log(
    "上次访问时间：",
    moment(stats.atime).format("YYYY-MM-DD HH:mm:ss")
  );
  console.log(
    "上次文件内容修改时间：",
    moment(stats.mtime).format("YYYY-MM-DD HH:mm:ss")
  );
  console.log(
    "上次文件状态修改时间：",
    moment(stats.ctime).format("YYYY-MM-DD HH:mm:ss")
  );
  console.log(
    "文件创建时间：",
    moment(stats.birthtime).format("YYYY-MM-DD HH:mm:ss")
  );
  console.log("目录？：", stats.isDirectory());
  console.log("文件？：", stats.isFile());
}

test();
