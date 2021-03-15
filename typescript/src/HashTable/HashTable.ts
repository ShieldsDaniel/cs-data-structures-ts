import HashTableNode from "./HashTableNode";

export default class HashTable<K, V> {
  private buckets: HashTableNode<K, V>[] | null[];

  constructor(size: number) {
    this.buckets = Array(size);
  }

  public set(key: K, value: V): void {
    const hashedKey = this.hashKey(key);
    const hashTableNode = new HashTableNode<K, V>(key, value);
    if (typeof this.buckets[hashedKey] === "undefined") {
      this.buckets[hashedKey] = hashTableNode;
    } else if (this.hasInBucket(hashedKey, key)) {
      this.updateValueInBucket(hashedKey, key, value);
    } else {
      const existingHashTable = this.buckets[hashedKey];
      hashTableNode.next = existingHashTable;
      this.buckets[hashedKey] = hashTableNode;
    }
  }

  public get(key: K): V | null {
    const hashedKey = this.hashKey(key);
    if (this.buckets[hashedKey]) {
      let currentNode: HashTableNode<K, V> | null = this.buckets[hashedKey];
      while (currentNode) {
        if (currentNode.key === key) {
          return currentNode.value;
        }
        currentNode = currentNode.next;
      }
    }
    return null;
  }

  public delete(key: K): void {
    const hashedKey = this.hashKey(key);
    if (this.buckets[hashedKey]) {
      let currentNode: HashTableNode<K, V> | null = this.buckets[hashedKey];
      if (currentNode && currentNode.key === key) {
        this.buckets[hashedKey] = currentNode.next;
      }
      while (currentNode) {
        if (currentNode.next && currentNode.next.key === key) {
          currentNode.next = currentNode.next.next;
          break;
        }
        currentNode = currentNode.next;
      }
    }
  }

  public has(key: K): boolean {
    const hashedKey = this.hashKey(key);
    if (this.buckets[hashedKey]) {
      let currentNode: HashTableNode<K, V> | null = this.buckets[hashedKey];
      while (currentNode) {
        if (currentNode.key === key) {
          return true;
        }
        currentNode = currentNode.next;
      }
    }
    return false;
  }

  private hasInBucket(hashedKey: number, key: K): boolean {
    let currentNode: HashTableNode<K, V> | null = this.buckets[hashedKey];
    while (currentNode) {
      if (currentNode.key === key) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  private updateValueInBucket(hashedKey: number, key: K, newValue: V): void {
    let currentNode: HashTableNode<K, V> | null = this.buckets[hashedKey];
    while (currentNode) {
      if (currentNode.key === key) {
        currentNode.value = newValue;
        break;
      }
      currentNode = currentNode.next;
    }
  }

  private hashKey(key: K) {
    let keyString: string;
    if (typeof key !== "string") {
      keyString = String(key);
    } else {
      keyString = key;
    }
    let charCodeValue = 0;
    for (let i = 0; i < keyString.length; ++i) {
      charCodeValue += keyString.charCodeAt(i);
    }
    return charCodeValue % this.buckets.length;
  }
}
