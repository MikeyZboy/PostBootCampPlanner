'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lesson.belongsToMany(models.Account, { through: models.Account_Lesson })
    }
  };
  Lesson.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    link: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Lesson',
    tableName: 'lessons'
  });
  return Lesson;
};