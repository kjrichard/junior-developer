'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const salt = bcrypt.genSaltSync();
    await queryInterface.bulkInsert('users', [
     
      {
        id: 1,
        username: 'admin',
        password: bcrypt.hashSync( '123456', salt ),
        name: 'Kevin Jair',
        surname: 'Richard',
        lastSurname: 'Rosero',
        phone: 123456,
        roleId: 1,
        creationUser: 'Kevin Jair',
        updateUser: null,
        status: 1,
        createdAt:  '2021-10-19',
        updatedAt: '2021-10-19'
       
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
