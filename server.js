const http = require('http');
const users = require('./users');



const server = http.createServer(users.requestHandler).listen(3000);