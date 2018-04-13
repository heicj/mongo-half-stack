const notFound = require('./not-found');
const dog = require('../models/dog');

const post = (req, res) => {
    dog.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const methods = { post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};