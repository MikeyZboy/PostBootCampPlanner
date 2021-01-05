'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {

    static associate(models) {
      Resource.belongsTo(models.Account, {
        foreignKey: 'account_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  };
  Resource.init({
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    topic: DataTypes.STRING,
    accountId: {
      type: DataTypes.INTEGER,
      field: 'account_id',
      references: {
        model: 'account',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Resource',
    tableName: 'resources'
  });
  return Resource;
};