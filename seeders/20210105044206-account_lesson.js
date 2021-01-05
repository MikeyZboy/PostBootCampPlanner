'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accounts_lessons', [{
      account_id: 1,
      lesson_id: 1
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts_lessons', null, {})
  }
};
