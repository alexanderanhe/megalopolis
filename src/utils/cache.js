class MemoryCache {
  constructor() {
    this.store = new Map();
  }

  set(key, value, ttlSeconds) {
    const ttlMs = (ttlSeconds || 0) * 1000;
    const expiresAt = ttlMs ? Date.now() + ttlMs : null;
    this.store.set(key, { value, expiresAt });
  }

  get(key) {
    const entry = this.store.get(key);
    if (entry === undefined || entry === null) return null;
    if (entry.expiresAt && entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  del(key) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

const cache = new MemoryCache();

module.exports = cache;
