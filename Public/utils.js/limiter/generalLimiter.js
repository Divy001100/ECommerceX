const rateLimiter = require('express-rate-limit')

const limiter =rateLimiter({
    max:100,
    windowMS:60*60*1000,
    message:"Too many request from this IP please try again in one hour"
})

module.exports =limiter