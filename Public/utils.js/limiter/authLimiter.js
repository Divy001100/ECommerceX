const rateLimiter = require('express-rate-limit')

const authLimiter = rateLimiter({
    max:20,
    windowMS:60*60*1000,
    message:'TOO MANY ATTEMPTS-YOUR ACCOUNT IS TEMPRORY BLOCKED!! PLEASE TRY AGAIN IN AN HOUR'
})

module.exports = authLimiter;