import {
    redisInstance as redis
} from '../config'

export class CacheManager {

    static create(): CacheManager {
        return new CacheManager();
    }

    public async set({ key, value }: { key: string, value: unknown }): Promise<void> {
        const expire = process.env.REDIS_EXPIRE || 300;
        const response = await redis.set(key, (typeof value == 'object') ? JSON.stringify(value) : value, 'EX', expire);
        return response;
    }

    public async get(Key: string): Promise<void> {
        const response = await redis.get(Key);
        return response;
    }
}