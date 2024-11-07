import IORedis from 'ioredis';
import {env} from './env';

export const redis = new IORedis(process.env.REDIS_URL as string);
