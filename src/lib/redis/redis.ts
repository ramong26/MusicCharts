import 'server-only';
import { Redis as UpstashRedis } from '@upstash/redis';
import IORedis from 'ioredis';

const useCache = process.env.USE_CACHE !== 'false';
const hasUpstash = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;
const hasSocket = !!process.env.REDIS_URL;

const upstash =
  useCache && hasUpstash
    ? new UpstashRedis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      })
    : null;

const socket =
  useCache && !upstash && hasSocket
    ? new IORedis(process.env.REDIS_URL!, {
        lazyConnect: false,
        connectTimeout: 5_000,
        maxRetriesPerRequest: 1,
        enableReadyCheck: true,
        enableOfflineQueue: false,
        retryStrategy: () => null,
        tls: process.env.REDIS_URL!.startsWith('rediss://') ? {} : undefined,
      })
    : null;

if (socket) {
  socket.on('error', (e) => {
    console.warn('[redis] error:', (e as Error)?.message || e);
  });
}

type RedisOk = 'OK';

const redis = {
  async get(key: string): Promise<string | null> {
    try {
      if (upstash) return (await upstash.get<string>(key)) ?? null;
      if (socket) return await socket.get(key);
      return null;
    } catch (err) {
      console.warn('[redis] get failed, ignoring:', (err as Error)?.message);
      return null;
    }
  },

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    try {
      if (upstash) {
        if (ttlSeconds && ttlSeconds > 0) {
          await upstash.set(key, value, { ex: ttlSeconds });
        } else {
          await upstash.set(key, value);
        }
        return;
      }
      if (socket) {
        if (ttlSeconds && ttlSeconds > 0) {
          await socket.set(key, value, 'EX', ttlSeconds);
        } else {
          await socket.set(key, value);
        }
      }
    } catch (err) {
      console.warn('[redis] set failed, ignoring:', (err as Error)?.message);
    }
  },

  // 하나 혹은 여러 키 삭제
  async del(keys: string | string[]): Promise<number> {
    try {
      if (upstash) {
        const arr = Array.isArray(keys) ? keys : [keys];

        const deleted = await upstash.del(...arr);
        return typeof deleted === 'number' ? deleted : 0;
      }
      if (socket) {
        const deleted = await socket.del(keys as string);
        return deleted ?? 0;
      }
      return 0;
    } catch (err) {
      console.warn('[redis] del failed, ignoring:', (err as Error)?.message);
      return 0;
    }
  },

  // 전체 DB 초기화
  async flushdb(): Promise<RedisOk | null> {
    try {
      if (upstash) {
        const res = await upstash.flushdb?.();
        return res ?? 'OK';
      }
      if (socket) {
        const res = await socket.flushdb();
        return (res as RedisOk) ?? 'OK';
      }
      return null;
    } catch (err) {
      console.warn('[redis] flushdb failed, ignoring:', (err as Error)?.message);
      return null;
    }
  },
};

export default redis;

export const { get: cacheGet, set: cacheSet, del: cacheDel, flushdb: cacheFlushDB } = redis;
