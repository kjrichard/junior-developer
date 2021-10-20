
const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user');

const { validateJWT, isAdminRole, hasRole } = require('../middleware');


router.post('/',  userController.newUser);
router.get('/', validateJWT, isAdminRole, userController.getUsers);
router.get('/:id',  validateJWT,  userController.getUser);
router.put('/:id', validateJWT, userController.updateUser);
router.delete('/eliminar/:id', validateJWT, isAdminRole, userController.deleteUser);



module.exports = router;