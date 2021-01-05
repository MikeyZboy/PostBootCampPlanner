'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lessons', [{
      title: 'Intro to Javascript',
      category: 'Javascript',
      link: 'https://www.codecademy.com/learn/introduction-to-javascript',
      complete: true,
      account_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lessons', null, {})
  }
};
