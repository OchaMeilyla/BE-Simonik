const sequelize = require("sequelize");
const mysql = require("mysql2");

const connection = new sequelize.Sequelize("SiMoniK","avnadmin", "AVNS_B3YCzlROK67iHGnFEfe", {
  host: "mysql-10de2d7f-ochameilyla-6e9b.a.aivencloud.com",
  dialect: "mysql",
  port: "24593",
  logging: false,
});

module.exports = connection;