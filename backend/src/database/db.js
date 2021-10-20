const { Sequelize } = require('sequelize');
const { development } = require('../config/config');


// New database connection.
const dbConnectionDev = new Sequelize(development.database, development.username, development.password, {
    host: development.host,
    dialect: development.dialect,
    logging: false,
    define: {
        underscored: true
    }
});


module.exports = {  dbConnectionDev  };
