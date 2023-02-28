module.exports = function (req, res, next) {
    if (req.method !== 'GET') {
        req.method = 'GET'
    }
    // Continue to JSON Server router
    next()
}
