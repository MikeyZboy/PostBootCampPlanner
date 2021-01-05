// 'use strict';
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('account_lessons', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       account_id: {
//         type: Sequelize.STRING,
//         field: 'account_id',
//         references: {
//           model: 'accounts',
//           key: 'id'
//         }
//       },
//       lesson_id: {
//         type: Sequelize.STRING,
//         field: 'lesson_id',
//         references: {
//           model: 'lessons',
//           key: 'id'
//         }
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('account_lessons');
//   }
// };