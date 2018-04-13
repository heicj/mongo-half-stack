const http = require('http');
const app = require('./lib/app');
const mongodb = require('./lib/mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dogs';

mongodb.connect(MONGODB_URI)
    .then(() => console.log('mongodb connected: ', MONGODB_URI))
    .catch(err => console.error('error', err));

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('server running on port: ', PORT);
});