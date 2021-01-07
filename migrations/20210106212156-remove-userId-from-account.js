'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('accounts', 'user_id')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('accounts', 'user_id')
  }
};
