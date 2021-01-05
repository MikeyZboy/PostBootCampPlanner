'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accounts', [{
      user_id: 1,
      firstName: 'Joe',
      lastName: 'Schmoe',
      bootcamp: 'General Assembly',
      goal: 'Full Stack Confidence',
      connections: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {})
  }
};
