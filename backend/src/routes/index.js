
const { Router } = require('express');
const router = Router();

router.use('/usuarios',require('./user'));
router.use('/auth',require('./auth'));

module.exports = router;