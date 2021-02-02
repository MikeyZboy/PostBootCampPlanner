"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      "accounts",
      "password",
      "password_digest"
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      "accounts",
      "password_digest",
      "password"
    );
  },
};
