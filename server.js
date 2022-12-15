/*
 * @Author: QinJiu
 * @Date: 2022-12-12 16:47:12
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-12-15 16:34:03
 * @Description: -
 */
const http = require("http");

const server = http.createServer((req, res) => {
  
  console.log("有请求进来了", req.method, req.url);
});

const port = 9527;

server.listen(port);

server.on("listening", () => {
  console.log(`server listen ${port}`);
});