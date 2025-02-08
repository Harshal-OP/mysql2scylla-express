const { scyllaClient } = require('../config/dbConfig');

// Function to create users table in ScyllaDB
const createScyllaTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT PRIMARY KEY,
      name TEXT,
      email TEXT,
      username TEXT,
      createdAt TIMESTAMP
    );
  `;

  try {
    await scyllaClient.execute(query);
    console.log('✅ ScyllaDB users table created successfully');
  } catch (error) {
    console.error('❌ Error creating ScyllaDB table:', error);
    throw error;
  }
};

// Function to insert a user into ScyllaDB
const insertUserIntoScylla = async (user) => {
  const query = `INSERT INTO users (id, name, email, username, createdAt) VALUES (?, ?, ?, ?, ?)`;

  try {
    await scyllaClient.execute(query, [
      user.id,
      user.name,
      user.email,
      user.username,
      user.createdAt,
    ], { prepare: true });

    console.log(`✅ User ${user.username} inserted into ScyllaDB`);
  } catch (error) {
    console.error('❌ ScyllaDB Insert Error:', error);
  }
};

module.exports = { createScyllaTable, insertUserIntoScylla };
