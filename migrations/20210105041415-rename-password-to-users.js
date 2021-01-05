'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'password_digest', 'password')
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'password', 'password_digest')
  }
};
