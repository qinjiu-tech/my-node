const fs = require("fs");

/**
 * 获取文件信息
 * @param {string} filename
 * @returns
 */
exports.getStat = async function (filename) {
  try {
    return await fs.promises.stat(filename);
  } catch (err) {
    console.log(err);
    return null;
  }
};
