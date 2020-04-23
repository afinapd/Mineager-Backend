const connection = require("../../config/dbConn");
const Sequelize = require("sequelize");

const Image = connection.define(
  "image",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    path: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "Image",
    paranoid: true,
  }
);

module.exports = Image;
