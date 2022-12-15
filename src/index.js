/*
 * @Author: QinJiu
 * @Date: 2022-12-12 16:47:12
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-12-15 16:27:16
 * @Description: -
 */
const http = require("http");

const server = http.createServer(requestListener);

const port = 9527;

server.listen(port);

server.on("listening", () => {
  console.log(`server listen ${port}`);
});

/**
 * 请求侦听器
 */
function requestListener(req, res) {
  requestHandler(req);
  responseHandler(req, res);
}

function requestHandler() {}

function responseHandler() {}
