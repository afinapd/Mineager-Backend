const connection = require("../../config/dbConn");
const Sequelize = require("sequelize");

const BloodType = connection.define(
  "bloodType",
  {
    id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: Sequelize.CHAR(2),
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "BloodType",
    paranoid: true,
  }
);

module.exports = BloodType;
