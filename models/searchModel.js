const { mysqlPool } = require('../config/dbConfig');
const { scyllaClient } = require('../config/dbConfig');

// Search Users in MySQL
const searchUsersMySQL = async (name) => {
  const start = process.hrtime();
  
  try {
    const query = `SELECT * FROM users WHERE name LIKE ?`;
    const [rows] = await mysqlPool.query(query, [`%${name}%`]);
    
    const end = process.hrtime(start);
    const timeTaken = (end[0] * 1e9 + end[1]) / 1e6; // Convert to milliseconds
    
    return { users: rows, timeTaken };
  } catch (error) {
    console.error('❌ MySQL Search Error:', error);
    return { users: [], timeTaken: null };
  }
};

// Search Users in ScyllaDB
const searchUsersScylla = async (name) => {
  const start = process.hrtime();
  
  try {
    const query = `SELECT * FROM users WHERE name = ?`;
    const result = await scyllaClient.execute(query, [name], { prepare: true });
    
    const end = process.hrtime(start);
    const timeTaken = (end[0] * 1e9 + end[1]) / 1e6; // Convert to milliseconds
    
    return { users: result.rows, timeTaken };
  } catch (error) {
    console.error('❌ ScyllaDB Search Error:', error);
    return { users: [], timeTaken: null };
  }
};

module.exports = { searchUsersMySQL, searchUsersScylla };
