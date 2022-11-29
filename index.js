/*
 * @Author: QinJiu
 * @Date: 2022-11-29 16:21:17
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-11-29 17:24:23
 * @Description: -
 */

const os = require("os");
const path = require("path");
const url = require("node:url");


console.log("==============================os模块============================================")

console.log("换行标记：", os.EOL === "\r\n");

console.log("cpu架构：", os.arch());

console.log("cpu核心列表：", os.cpus().length);

console.log("可用内存：", os.freemem() / 1024 / 1024 / 1024 + "G");

console.log("当前用户的在系统中的目录：", os.homedir());

console.log("主机名：", os.hostname());

console.log("默认临时文件目录：", os.tmpdir());

console.log("==============================path模块============================================")

console.log("路径的最后一部分：", path.basename('/a/b/c/d.html', 'ml'))

console.log("平台分隔符(环境变量等)：", path.delimiter)

console.log("文件所在目录：", path.dirname('/a/b/c.js'))

console.log("文件后缀：", path.extname('/a/b/c.js'))

console.log("路径拼接：", path.join('/a', 'b/c/', '/d/e.js'))

console.log("转换为正常路径：", path.normalize('/a/b/c/d/../../test.js'))

console.log("转换为相对路径：", path.relative('/a/b/c/d/e', '/a/b/index.html'))

console.log("转换为绝对路径", path.resolve('a', './b/c', '../d.html'))

console.log("路径分隔符：", path.sep)

console.log("==============================url模块============================================")

console.log(url)
