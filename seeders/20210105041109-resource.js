'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("resources", [
      {
        title: "Eloquent Javascript",
        link: "https://eloquentjavascript.net/",
        topic: "Programming Concepts",
        account_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('resources', null, {})
  }
};
