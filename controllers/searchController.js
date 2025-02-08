const { searchUsersMySQL, searchUsersScylla } = require('../models/searchModel');

const searchUsers = async (req, res) => {
  const { name } = req.query;
  
  if (!name) {
    return res.status(400).json({ message: '❌ Name query parameter is required' });
  }

  console.log(`🔍 Searching for users with name: ${name}`);

  try {
    const [mysqlResult, scyllaResult] = await Promise.all([
      searchUsersMySQL(name),
      searchUsersScylla(name)
    ]);

    res.json({
      message: '✅ Search Completed',
      mysql: {
        users: mysqlResult.users,
        timeTaken: `${mysqlResult.timeTaken} ms`,
      },
      scyllaDB: {
        users: scyllaResult.users,
        timeTaken: `${scyllaResult.timeTaken} ms`,
      }
    });
  } catch (error) {
    console.error('❌ Search Error:', error);
    res.status(500).json({ message: '❌ Error during search', error: error.message });
  }
};

module.exports = { searchUsers };
