'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {

    static associate(models) {
      Lesson.belongsTo(models.Account, {
        foreignKey: 'account_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  };
  Lesson.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    link: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    modelName: 'Lesson',
    tableName: 'lessons'
  });
  return Lesson;
};