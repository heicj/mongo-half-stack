module.exports = (req, res) => {
    res.statusCode = 404;
    res.end({
        error: true,
        message: `cannot ${req.method} ${req.url}`
    });
};