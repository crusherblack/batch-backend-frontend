"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Programmer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Programmer.hasMany(models.Skill, {
        as: "skills",
      });
    }
  }
  Programmer.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Programmer",
    }
  );
  return Programmer;
};
