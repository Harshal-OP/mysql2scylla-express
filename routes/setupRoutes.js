const express = require('express');
const { setupScyllaDB } = require('../controllers/setupController');

const router = express.Router();

router.post('/setup', setupScyllaDB);

module.exports = router;
