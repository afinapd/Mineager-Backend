const connection = require("../../config/dbConn");
const Sequelize = require("sequelize");

const Gender = connection.define(
  "gender",
  {
    id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "Gender",
    // timestamps: false,
    paranoid: true,
  }
);

module.exports = Gender;
