'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Resource.init({
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    topic: DataTypes.STRING,
    account_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Resource',
    tableName: 'resources'
  });
  return Resource;
};