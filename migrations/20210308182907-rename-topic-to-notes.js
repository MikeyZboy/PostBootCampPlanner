'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.renameColumn('resources', 'topic', 'notes')
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.renameColumn("resources", "notes", "topic");
  }
};
