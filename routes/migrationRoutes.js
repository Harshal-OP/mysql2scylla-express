const express = require('express');
const { migrateUsers } = require('../controllers/migrationController');

const router = express.Router();

router.post('/migrate', migrateUsers);

module.exports = router;
