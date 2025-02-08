const { createScyllaTable } = require('./models/scyllaModel');

const setup = async () => {
  try {
    await createScyllaTable();
    console.log('✅ ScyllaDB table setup completed.');
  } catch (error) {
    console.error('❌ Error setting up ScyllaDB table:', error);
  } finally {
    process.exit();
  }
};

setup();
