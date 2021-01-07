'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // User.hasOne(models.Account, {
      //   foreignKey: 'userId',
      //   as: 'user_id',
      //   onDelete: 'cascade',
      //   onUpdate: 'cascade'
      // })  
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};