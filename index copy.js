/*
 * @Author: QinJiu
 * @Date: 2023-01-09 14:53:04
 * @LastEditors: Qinjiu
 * @LastEditTime: 2023-01-09 15:28:27
 * @Description: -
 */
const promise = new Promise(function f1(resolve) {
  resolve();
  console.log(1);
});

promise.then(function f2() {
  console.log(2);
});

process.nextTick(function f3() {
  console.log(3);
});
