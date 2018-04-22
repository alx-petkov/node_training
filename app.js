// code for testing es6 functionality
// class Polygon {
//     constructor(height, width) {
//         this.area = height * width;
//     }
// }
//
// console.log(new Polygon(4,3).area);
// // expected output: 12
//
//
// const arrFunc = () => {
//     let abrakadabra = 'abrakadabra';
//     console.log(abrakadabra)
// }
//
// arrFunc();

// require("babel-core").transform("code", []);

const config = require('./config/config.json');
console.log(config.name);

import User from './models/User';
const user1 = new User();

import Product from './models/Product';
const product1 = new Product();
