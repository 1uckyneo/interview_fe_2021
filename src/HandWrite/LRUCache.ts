class LRUCache<K, V> {
  capacity: number = 0;
  entries: Map<K, V> = new Map();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K) {
    if (this.entries.has(key)) {
      const value = this.entries.get(key) as V;
      this.entries.delete(key);
      this.entries.set(key, value);
      return value;
    }

    return undefined;
  }

  put(key: K, value: V) {
    // key 存在，更新 value
    if (this.entries.has(key)) {
      this.entries.delete(key);
      this.entries.set(key, value);
      // key 存在，cache 未满
    } else if (this.entries.size < this.capacity) {
      this.entries.set(key, value);
      // 添加新key，删除旧key
    } else {
      this.entries.set(key, value);
      // 删除map的第一个元素，即为最长未使用的
      this.entries.delete(this.entries.keys().next().value);
    }
  }
}

export default {
  run: () => {
    const cache = new LRUCache<number, number>(2);
    cache.put(1, 1);
    cache.put(2, 2);
    console.log('cache.get(1)', cache.get(1));
    cache.put(3, 3); // 该操作会使得密钥 2 作废
    console.log('cache.get(2)', cache.get(2)); // 返回 undefined (未找到)
    cache.put(4, 4); // 该操作会使得密钥 1 作废
    console.log('cache.get(1)', cache.get(1)); // 返回 undefined (未找到)
    console.log('cache.get(3)', cache.get(3)); // 返回  3
    console.log('cache.get(4)', cache.get(4)); // 返回  4
  },
};
