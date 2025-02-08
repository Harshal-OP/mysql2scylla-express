const express = require('express');
const { searchUsers } = require('../controllers/searchController');

const router = express.Router();

router.get('/search', searchUsers);

module.exports = router;
