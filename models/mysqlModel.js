const { mysqlPool } = require('../config/dbConfig');

// Fetch all users from MySQL
const fetchUsersFromMySQL = async () => {
  try {
    const [rows] = await mysqlPool.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('❌ MySQL Fetch Error:', error);
    throw error;
  }
};

module.exports = { fetchUsersFromMySQL };
