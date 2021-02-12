"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("lessons", "complete", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("lessons", "complete", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },
};
