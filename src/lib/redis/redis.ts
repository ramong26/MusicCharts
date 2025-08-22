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

export async function cacheGet(key: string): Promise<string | null> {
  try {
    if (upstash) return await upstash.get<string>(key);
    if (socket) return await socket.get(key);
    return null;
  } catch (err) {
    console.warn('[redis] get failed, ignoring:', (err as Error)?.message);
    return null;
  }
}

export async function cacheSet(key: string, value: string, ttlSeconds?: number): Promise<void> {
  try {
    if (upstash) {
      if (ttlSeconds) await upstash.set(key, value, { ex: ttlSeconds });
      else await upstash.set(key, value);
      return;
    }
    if (socket) {
      if (ttlSeconds && ttlSeconds > 0) await socket.set(key, value, 'EX', ttlSeconds);
      else await socket.set(key, value);
    }
  } catch (err) {
    console.warn('[redis] set failed, ignoring:', (err as Error)?.message);
  }
}
