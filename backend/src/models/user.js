'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.belongsTo(models.role);
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
    },
    password: {
       type: DataTypes.STRING
    },
    name: {
       type: DataTypes.STRING
    },
    surname: {
      type: DataTypes.STRING
   },
    lastSurname: {
       type: DataTypes.STRING
    },
    phone: {
       type: DataTypes.STRING
    },
    roleId: {
      type: DataTypes.INTEGER,
       references: {
         model: 'roles',
         key: 'id'
       },
       onUpdate: 'NO ACTION',
       onDelete: 'NO ACTION',
    },
    creationUser: {
      type: DataTypes.STRING
    },
    updateUser: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
   
    
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};