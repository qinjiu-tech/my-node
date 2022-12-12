/*
 * @Author: QinJiu
 * @Date: 2022-12-12 16:47:12
 * @LastEditors: Qinjiu
 * @LastEditTime: 2022-12-12 17:28:54
 * @Description: -
 */
const net = require("net");

const client = net.createConnection(
  {
    host: "www.baidu.com",
    port: 443,
  },
  () => {
    console.log("连接成功!");
    client.write(`GET / HTTP/1.1
Connection: keep-alive

`);
  }
);
client.on("data", (data) => {
  console.log("接收到数据：", data.toString());
});
client.on("end", () => {
  console.log("end！");
});
