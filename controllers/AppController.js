/*
2 endpoints:

GET /status should return if Redis is alive and if the DB is alive too by using the 2 utils created previously: { "redis": true, "db": true } with a status code 200
GET /stats should return the number of users and files in DB: { "users": 12, "files": 1231 } with a status code 200
users collection must be used for counting all users
files collection must be used for counting all files
*/
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static getStatus(request, response) {
    return response.status(200).send(
      `{"redis": ${redisClient.isAlive()}, "db": ${dbClient.isAlive()}}`,
    );
  }

  static async getStats(request, response) {
    const nbusers = await dbClient.nbUsers();
    const nbfiles = await dbClient.nbFiles();
    return response.status(200).send(
      `{"users": ${nbusers}, "files": ${nbfiles}}`,
    );
  }
}

module.exports = AppController;
