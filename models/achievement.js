'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {

    static associate(models) {
      Achievement.belongsTo(models.Account, {
        foreignKey: "account_id",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  };
  Achievement.init({
    name: DataTypes.STRING,
    achievementImage: {
      type: DataTypes.TEXT,
      field: 'achievement_image'
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
    modelName: 'Achievement',
    tableName: 'achievements'
  });
  return Achievement;
};