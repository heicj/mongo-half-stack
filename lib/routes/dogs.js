const notFound = require('./not-found');
const dog = require('../models/dog');

const post = (req, res) => {
    dog.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    dog.findOne(id).then(one => {
        res.send(one);
    });
};


const methods = { post, get };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};