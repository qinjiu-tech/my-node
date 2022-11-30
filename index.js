/*
 * @Author: QinJiu
 * @Date: 2022-11-29 16:21:17
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-11-30 17:43:03
 * @Description: -
 */

const os = require("os");
const path = require("path");
const url = require("node:url");
const util = require("node:util");

console.log(
  "==============================os模块==================================="
);

console.log("换行标记：", os.EOL === "\r\n");

console.log("cpu架构：", os.arch());

console.log("cpu核心列表：", os.cpus().length);

console.log("可用内存：", os.freemem() / 1024 / 1024 / 1024 + "G");

console.log("当前用户的在系统中的目录：", os.homedir());

console.log("主机名：", os.hostname());

console.log("默认临时文件目录：", os.tmpdir());

console.log(
  "==============================path模块=================================="
);

console.log("路径的最后一部分：", path.basename("/a/b/c/d.html", "ml"));

console.log("平台分隔符(环境变量等)：", path.delimiter);

console.log("文件所在目录：", path.dirname("/a/b/c.js"));

console.log("文件后缀：", path.extname("/a/b/c.js"));

console.log("路径拼接：", path.join("/a", "b/c/", "/d/e.js"));

console.log("转换为正常路径：", path.normalize("/a/b/c/d/../../test.js"));

console.log("转换为相对路径：", path.relative("/a/b/c/d/e", "/a/b/index.html"));

console.log("转换为绝对路径", path.resolve("a", "./b/c", "../d.html"));

console.log("路径分隔符：", path.sep);

console.log(
  "==============================url模块================================="
);

// 返回一个URL对象
const myURL = new url.URL(
  "https://www.baidu.com/image?keywords=a&time=1000#abc"
);
console.log(myURL.searchParams);
// console.log(myURL.searchParams.get("time"))
// console.log(myURL.searchParams.has("a"))
// console.log(myURL.searchParams.set("b", 3000))
// console.log(myURL);

// url.URL对象转换为字符串
// console.log(url.format(myURL, { fragment: false, unicode: true, auth: false }));

// 旧API
// const b = url.parse("https://www.baidu.com/image?keywords=a&time=1000#abc");
// console.log(b);

console.log(
  "==============================util模块================================="
);

// callbackify: 将异步函数转换为回调形式
// async function asyncFunc(params) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("params:", params);
//       if (Math.random() > 0.5) {
//         resolve(params);
//       } else {
//         reject("error:" + JSON.stringify(params));
//       }
//     }, 1000);
//   });
// }
// const func = util.callbackify(asyncFunc);
// func({ a: 1 }, (error, result) => {
//   console.log("error:" + error, "result:" + result);
// });

// // inherits: 继承（旧API）
// function A() {
//     this.a = 'a';
// }
// function B() {
//     this.b = 'b';
// }
// // A继承B
// util.inherits(A, B)
// const aObj = new A();
// console.log(aObj);

// isDeepStrictEqual：是否深度严格相等
const obj1 = {
  a: 1,
  b: {
    name: "b",
    age: 18,
  },
};
const obj2 = {
  a: 1,
  b: {
    name: "b",
    age: "18",
  },
};
console.log(util.isDeepStrictEqual(obj1, obj2));

// promisify：回调函数转换为Promise
function getUserInfo(a, b, callback) {
  console.log(a, b);
  setTimeout(() => {
    const num = Math.random();
    console.log(num);
    if (num > 0.8) {
      callback(null, '成功');
    } else {
      callback(new Error('失败'), null);
    }
  }, 1000);
}
// getUserInfo("root", 123456, (error, result) => {
//   console.log(error, result);
// });
const asyncGetUserInfo = util.promisify(getUserInfo);
asyncGetUserInfo("admin", "111111").then(
  (res) => {
    console.log("then:", res);
  },
  (error) => {
    console.log("catch===:", error);
  }
);
// const fs = require('node:fs');
// console.log(fs.stat)
