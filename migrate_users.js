const { fetchUsersFromMySQL } = require('./models/mysqlModel');
const { insertUserIntoScylla } = require('./models/scyllaModel');

const migrate = async () => {
  try {
    console.log('🔄 Fetching users from MySQL...');
    const users = await fetchUsersFromMySQL();

    console.log(`🔄 Migrating ${users.length} users to ScyllaDB...`);
    for (const user of users) {
      await insertUserIntoScylla(user);
    }

    console.log('✅ Migration Completed Successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Migration Error:', error);
    process.exit(1);
  }
};

migrate();
