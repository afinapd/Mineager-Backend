const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const currEnv = process.env.NODE_ENV;

let connection;
if (currEnv == "development") {
  connection = new Sequelize("sqlite::memory:");
} else {
  connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_TYPE,
    }
  );
}

module.exports = connection;
