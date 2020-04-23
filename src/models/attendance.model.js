const connection = require("../../config/dbConn");
const Sequelize = require("sequelize");

const Attendance = connection.define(
  "attendance",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    timeOut: {
      type: Sequelize.STRING,
    }
  },
  {
    freezeTableName: true,
    tableName: "Attendance",
    paranoid: true,
  }
);

module.exports = Attendance;
