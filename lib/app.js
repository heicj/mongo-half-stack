const { parse } = require('url');
const bodyParser = require('./body-parser');
const notFound = require('./routes/not-found');
const dogs = require('./routes/dogs');

const routes = {
    __proto__: null,
    dogs
};

module.exports = (req, res) => {

    const parsedUrl = parse(req.url, true);
    req.query = parsedUrl.query;
    req.paths = parsedUrl.pathname.slice(1).split('/');
    const key = req.paths[0];

    res.setHeader('Content-Type', 'application/json');
    res.send = obj => res.end(JSON.stringify(obj));

    const route = routes[key] || notFound;

    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req, res);
        });
};
