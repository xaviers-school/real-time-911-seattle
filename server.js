const express = require('express');
const app = express();

var PORT = process.env.PORT || 3000;
var server = module.exports = exports = app.listen(PORT, () => console.log('Server started on port: ' + PORT));
