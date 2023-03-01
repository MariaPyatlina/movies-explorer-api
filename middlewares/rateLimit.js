const rateLimit = require('../node_modules/express-rate-limit');

// Лимит запросов с каждого IP: MAX запросов за windowMs минут
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 100,
});

module.exports = { limiter };
