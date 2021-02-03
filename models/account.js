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
  Account.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      bootcamp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true
        },
      },
      goal: DataTypes.STRING,
      password_digest: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts",
    }
  );
  return Account;
};