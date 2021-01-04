'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account_Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Account_Lesson.init({
    account_id: DataTypes.STRING,
    lesson_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account_Lesson',
    tableName: 'accounts_lessons'
  });
  return Account_Lesson;
};