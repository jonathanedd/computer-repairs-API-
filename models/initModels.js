const { User } = require("./user.model");
const { Repairs } = require("./repairs.models");

const initModels = () => {
  User.hasMany(Repairs);
  Repairs.belongsTo(User);
};

module.exports = { initModels };
