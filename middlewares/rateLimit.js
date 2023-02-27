const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 100, // Лимит запросов с каждого IP: 100 запросов за 15 минут
});

module.exports = { limiter };
