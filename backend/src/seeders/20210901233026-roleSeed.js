'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('roles', [
      {
        name:  'Administrador',
        status: 1,
        createdAt:  '2021-10-19',
        updatedAt: '2021-10-19'
      },
      {
        name:  'Usuario',
        status: 1,
        createdAt:  '2021-10-19',
        updatedAt: '2021-10-19'
      },
      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
