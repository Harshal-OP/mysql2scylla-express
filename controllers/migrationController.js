const { fetchUsersFromMySQL } = require('../models/mysqlModel');
const { insertUserIntoScylla } = require('../models/scyllaModel');

const migrateUsers = async (req, res) => {
  try {
    console.log('Fetching users from MySQL...');
    const users = await fetchUsersFromMySQL();

    console.log(`Migrating ${users.length} users to ScyllaDB...`);
    for (const user of users) {
      await insertUserIntoScylla(user);
    }

    console.log('Migration Completed Successfully!');
    res.json({ message: 'Migration completed', totalMigrated: users.length });
  } catch (error) {
    console.error('Migration Error:', error);
    res.status(500).json({ message: 'Migration failed', error: error.message });
  }
};

module.exports = { migrateUsers };
