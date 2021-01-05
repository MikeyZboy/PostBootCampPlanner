'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account_Lesson extends Model {

    static associate(models) {
      // don't believe an association is necessary - after reading the Seq docs,
      // this appears to be autopopulated as a through table
    }
  };
  Account_Lesson.init({
    account_id: {
      type: DataTypes.STRING,
      field: 'account_id',
      references: {
        model: 'account',
        key: 'id'
      }
    },
    lesson_id: {
      type: DataTypes.STRING,
      field: 'lesson_id',
      references: {
        model: 'lesson',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Account_Lesson',
    tableName: 'accounts_lessons'
  });
  return Account_Lesson;
};