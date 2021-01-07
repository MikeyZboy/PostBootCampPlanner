'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {

    static associate(models) {
      // define association here
      // Account.belongsTo(models.User, {
      //   foreignKey: 'userId',
      //   as: 'user_id',
      //   onDelete: 'cascade',
      //   onUpdate: 'cascade'
      // })
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
    }
  };
  Account.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bootcamp: DataTypes.STRING,
    goal: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
    // userId: {   
    //   type: DataTypes.INTEGER,
    //   field: 'user_id',
    //   references: {
    //     model: 'user',
    //     key: 'id'
    //   }
    // }
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts'
  });
  return Account;
};