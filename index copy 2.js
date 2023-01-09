setTimeout(function f1() {
  console.log(1);
}, 0);

setImmediate(function f2() {
  console.log(2);
});