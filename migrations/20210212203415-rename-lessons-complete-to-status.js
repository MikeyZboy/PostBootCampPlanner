'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('lessons', 'complete', 'status')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('lessons', 'status', 'complete')
  }
};
