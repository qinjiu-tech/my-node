/*
 * @Author: QinJiu
 * @Date: 2022-12-12 16:47:12
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-12-13 16:31:35
 * @Description: -
 */
const net = require("net");

const socket = net.createConnection(
  {
    host: "duyi.ke.qq.com",
    port: 80,
  },
  () => {
    console.log("连接成功!");
  }
);

// 多次接收数据
socket.on("data", (chunk) => {
  console.log("接收到数据：", chunk.toString("utf-8"));
  //   socket.end();
});

socket.on("close", () => {
  console.log("连接关闭！");
});

// socket.write(`你好！`);

socket.write(`GET / HTTP/1.1
Host: duyi.ke.qq.com
Connection: keep-alive

`);
