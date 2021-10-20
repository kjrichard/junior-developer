

const validateJWT = require('../middleware/validate-jwt');
const validateRoles = require('../middleware/validate-roles');

module.exports = {
    ...validateJWT,
    ...validateRoles,
}