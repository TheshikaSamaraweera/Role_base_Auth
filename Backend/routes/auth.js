const { logIn } = require('../controllers/AuthController');

// auth.js
const router = require('express').Router();

router.route('/').post(logIn);

module.exports = router;
