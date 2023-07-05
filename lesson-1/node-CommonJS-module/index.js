// const nodemon = require("nodemon");

const obj = require("./users");
// console.log(obj);

const {admins} = require("./users");
// console.log(admins);

// const {getCurrentMonth} = require("./date");
// const currentMonth = getCurrentMonth();
// console.log(currentMonth)

const currentMonth = require("./date").getCurrentMonth();
console.log(currentMonth)