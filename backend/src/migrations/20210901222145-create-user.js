'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING
      },
      
      name: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      lastSurname: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      creationUser: {
        type: Sequelize.STRING
      },
      updateUser: {
        type: Sequelize.STRING
      },
     
      status: {
        type: Sequelize.STRING,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};