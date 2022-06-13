/*
Express server:

it should listen on the port set by the environment variable PORT or by default 5000
it should load all routes from the file routes/index.js
*/
const express = require('express');
const controllerRouting = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

controllerRouting(app);

app.listen(port, () => {
  console.log(`Express Server running on http://localhost:${port}/`);
});
module.exports = app;
