const express = require('express');
const setupRoutes = require('./routes/setupRoutes');
const migrationRoutes = require('./routes/migrationRoutes');
const searchRoutes = require('./routes/searchRoutes'); // Add this

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api', setupRoutes);
app.use('/api', migrationRoutes);
app.use('/api', searchRoutes); // Register the search route

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
