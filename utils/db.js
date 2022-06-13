/*
db.js contains class DBClient.

DBClient has:

the constructor that creates a client to MongoDB:
host: from the environment variable DB_HOST or default: localhost
port: from the environment variable DB_PORT or default: 27017
database: from the environment variable DB_DATABASE or default: files_manager
a function isAlive that returns true when the connection to MongoDB is a success otherwise, false
an asynchronous function nbUsers that returns the number of documents in the collection users
an asynchronous function nbFiles that returns the number of documents in the collection files
After the class definition, create and export an instance of DBClient called dbClient.
*/
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.dbName = null;
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/`;
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
      if (error) throw (error);
      this.dbName = client.db(database);
    });
  }

  isAlive() {
    return !!this.dbName;
  }

  async nbUsers() {
    const numDocs = await this.dbName.collection('users').countDocuments();
    return numDocs;
  }

  async nbFiles() {
    const numDocs = await this.dbName.collection('files').countDocuments();
    return numDocs;
  }
}
const dbClient = new DBClient();
module.exports = dbClient;
