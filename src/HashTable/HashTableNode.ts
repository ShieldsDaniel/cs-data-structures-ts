
export default class HashTableNode<K, V> {
  public next: HashTableNode<K, V>|null = null;
  constructor(public key: K, public value: V) {}
}
