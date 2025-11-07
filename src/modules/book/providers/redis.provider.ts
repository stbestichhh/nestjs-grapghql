import Redis from 'ioredis';
import { Provider } from '@nestjs/common';

export const RedisProvider: Provider = {
  provide: 'REDIS',
  useFactory: () =>
    new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD,
    }),
};
