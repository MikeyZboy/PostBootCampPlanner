'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {

    static associate(models) {
      Account.hasMany(models.Resource, {
        foreignKey: 'accountId',
        as: 'resources',
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      Account.hasMany(models.Lesson, {
        foreignKey: 'accountId',
        as: 'lessons',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      Account.hasMany(models.Achievement, {
        foreignKey: 'accountId',
        as: 'achievements',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  };
  Account.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bootcamp: DataTypes.STRING,
    goal: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts'
  });
  return Account;
};