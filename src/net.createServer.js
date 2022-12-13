/*
 * @Author: QinJiu
 * @Date: 2022-12-12 16:47:12
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-12-13 17:25:04
 * @Description: -
 */
const net = require("net");

const server = net.createServer();

const options = {
  port: 9527,
};
server.listen(options, () => {
  console.log("监听端口成功：", options?.port);
});

server.on("connection", (socket) => {
  console.log("有客户端连接到服务器：", socket.address());

  socket.on("data", (chunk) => {
    console.log("接收到来自客户端的数据：", chunk.toString("utf-8"));

    const result = `HTTP/1.1 200 OK
Content-Type: text/html

<h1>你好啊</h1>`;

    // socket.write(`你好啊`);
    socket.write(result);
    socket.end();
  });

  socket.on("close", () => {
    console.log("连接关闭了");
  });
});
