const mysql = require('mysql2/promise');
const cassandra = require('cassandra-driver');

// MySQL Connection
const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'bigshorts',
};

const mysqlPool = mysql.createPool(mysqlConfig);

// ScyllaDB Connection
const scyllaClient = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'DC1',
  keyspace: 'my_keyspace',
});

module.exports = { mysqlPool, scyllaClient };
