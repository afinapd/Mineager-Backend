const User = require("./user.model");
const BloodType = require("./btype.model");
const Department = require("./department.model");
const Attendance = require("./attendance.model");
const Gender = require("./gender.model");
const Image = require("./image.model");

const dbAssociation = () => {
  Department.hasMany(User);
  User.belongsTo(Department);

  BloodType.hasMany(User);
  User.belongsTo(BloodType);

  User.hasMany(Attendance);
  Attendance.belongsTo(User);

  Gender.hasMany(User);
  User.belongsTo(Gender);

  Image.hasOne(User);
  User.belongsTo(Image);
};

module.exports = dbAssociation;
