'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {

    static associate(models) {
      // define association here
      Account.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      //don't know if this is necessary beacuse we'll be doing an assoc on Resource
      Account.hasMany(models.Resource, {
        foreignKey: 'account_id',
        as: 'resources',
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      Account.hasMany(models.Lesson, {
        foreignKey: 'account_id',
        as: 'lessons',
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
    connections: DataTypes.STRING,
    userId: {   
      type: DataTypes.STRING,
      field: 'user_id',
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts'
  });
  return Account;
};