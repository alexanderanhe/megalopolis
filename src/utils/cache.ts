type CacheEntry<T> = {
  value: T;
  expiresAt: number | null;
};

class MemoryCache {
  private store: Map<string, CacheEntry<unknown>>;

  constructor() {
    this.store = new Map();
  }

  set<T>(key: string, value: T, ttlSeconds?: number) {
    const ttlMs = (ttlSeconds || 0) * 1000;
    const expiresAt = ttlMs ? Date.now() + ttlMs : null;
    this.store.set(key, { value, expiresAt });
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key) as CacheEntry<T> | undefined;
    if (entry === undefined) return null;
    if (entry.expiresAt && entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  del(key: string) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

const cache = new MemoryCache();

export default cache;
