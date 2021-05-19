const { clearCache } = require('./cache.service')

module.exports = async (req, res, next) => {
    console.log(req.body.userId)
    await next();

    clearCache(req.body.userId);

    console.log("Clear cache --- >>>>",req.body.userId)

}