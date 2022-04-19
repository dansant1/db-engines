const Redis = require('ioredis')

export const redisInstance = new Redis({
    hostname: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});