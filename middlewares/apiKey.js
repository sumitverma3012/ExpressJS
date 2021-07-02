function apiKey(req, res, next) {
    const apiKey = '12345';
    const userApiKey = req.query.apiKey;
    if(apiKey === userApiKey) {
        next();
    } else {
        res.json({message: "Not Allowed!"});
    }
}

module.exports = apiKey;