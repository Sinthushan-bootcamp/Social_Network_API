const { connect, connection } = require('mongoose');
// create a new database connection string
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

connect(connectionString);

module.exports = connection;