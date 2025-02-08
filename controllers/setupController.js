const { createScyllaTable } = require('../models/scyllaModel');

const setupScyllaDB = async (req, res) => {
  try {
    await createScyllaTable();
    res.json({ message: '✅ ScyllaDB users table created successfully' });
  } catch (error) {
    res.status(500).json({ message: '❌ Error creating ScyllaDB table', error: error.message });
  }
};

module.exports = { setupScyllaDB };
