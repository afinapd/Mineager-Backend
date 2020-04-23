const connection = require("../../config/dbConn");
const Sequelize = require("sequelize");

const Department = connection.define(
  "department",
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
    businessId: {
      type: Sequelize.CHAR,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "Department",
    paranoid: true,
  }
);

module.exports = Department;
