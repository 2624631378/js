import sum from './sum';  //es6 模式
var minus = require('./minus') //commonjs 方式

console.log(sum(2,4),minus(2,4));
