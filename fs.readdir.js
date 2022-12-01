const moment = require("moment");
const os = require("os");
const fs = require("fs/promises");

const path = require("path");

console.log(__dirname);
// console.log(os.EOL);

async function printFiles(filePath) {
  const files = await fs.readdir(filePath, {
    withFileTypes: true,
  });
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(file.name);
    if (file.isDirectory()) {
      const newPath = filePath + '/' + file.name;
      printFiles(newPath);
    }
  }
}

async function test() {
  const filePath = path.resolve(__dirname, "./mysql");
  printFiles(filePath);
}

test();
