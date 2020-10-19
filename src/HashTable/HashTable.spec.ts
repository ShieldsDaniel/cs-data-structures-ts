import HashTable from "./HashTable";
import HashTableNode from "./HashTableNode";

describe("The HashTable class", () => {

  describe("The insert() method", () => {

    it("Should insert the value at correct hashed index", () => {
      const hashTable = new HashTable<string, number>(30) as any;
      hashTable.set("Dean", 20);
      hashTable.set("Becca", 30);
      expect(hashTable.buckets[16].value).toBe(20);
      expect(hashTable.buckets[12].value).toBe(30);
    });

    it("Should insert the value at correct hashed index", () => {
      const hashTable = new HashTable<string, number>(30) as any;
      hashTable.set("Dean", 20);
      hashTable.set("Becca", 30);
      hashTable.set("Dane", 40);
      expect(hashTable.buckets[16].value).toBe(40);
      expect(hashTable.buckets[16].next?.value).toBe(20);
      expect(hashTable.buckets[12].value).toBe(30);
    });

    it("Should update the value if the key already exists", () => {
      const hashTable = new HashTable<string, number>(30) as any;
      hashTable.set("Dean", 20);
      hashTable.set("Becca", 30);
      hashTable.set("Dane", 40);

      hashTable.set("Becca", 60);
      hashTable.set("Dean", 50);
      expect(hashTable.buckets[16].value).toBe(40);
      expect(hashTable.buckets[16].next?.value).toBe(50);
      expect(hashTable.buckets[12].value).toBe(60);
    });
  });

  describe("The get() method", () => {

    it("Should return null if key does not exist", () => {
      const hashTable = new HashTable<string, number>(30) as any;
      expect(hashTable.get("Dean")).toBe(null);
    });

    it("Should return value if key exists", () => {
      const hashTable = new HashTable<string, number>(30) as any;
      const deanAndDane = new HashTableNode<string, number>("Dane", 40);
      deanAndDane.next = new HashTableNode<string, number>("Dean", 20);
      hashTable.buckets[16] = deanAndDane;
      hashTable.buckets[12] = new HashTableNode<string, number>("Becca", 30);
      expect(hashTable.get("Dean")).toBe(20);
      expect(hashTable.get("Dane")).toBe(40);
      expect(hashTable.get("Becca")).toBe(30);
    });
  });

  describe("The delete() method", () => {

    it("Should remove key/value pair if key exists", () => {
      const hashTable = new HashTable<string, number>(30) as any;
      const deanAndDane = new HashTableNode<string, number>("Dane", 40);
      deanAndDane.next = new HashTableNode<string, number>("Dean", 20);
      hashTable.buckets[16] = deanAndDane;
      hashTable.buckets[12] = new HashTableNode<string, number>("Becca", 30);
      hashTable.delete("Dean");
      hashTable.delete("Becca");
      expect(hashTable.buckets[16].value).toBe(40);
      expect(hashTable.buckets[12]).toBeFalsy();
    });
  });

  describe("The has() method", () => {

    it("Should return false if key does not exist in hash table", () => {
      const hashTable = new HashTable<string, number>(30);
      expect(hashTable.has("Dean")).toBeFalsy();
      expect(hashTable.has("Becca")).toBeFalsy();
    });

    it("Should return true if a key exists in the hash table", () => {
      const hashTable = new HashTable<string, number>(30) as any;
      const deanAndDane = new HashTableNode<string, number>("Dane", 40);
      deanAndDane.next = new HashTableNode<string, number>("Dean", 20);
      hashTable.buckets[16] = deanAndDane;
      hashTable.buckets[12] = new HashTableNode<string, number>("Becca", 30);
      expect(hashTable.has("Dane")).toBeTruthy();
      expect(hashTable.has("Dean")).toBeTruthy();
      expect(hashTable.has("Becca")).toBeTruthy();
    });
  });
});
