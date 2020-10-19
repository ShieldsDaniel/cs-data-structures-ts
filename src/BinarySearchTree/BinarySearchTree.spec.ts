import { IsQueue } from "../LinkedList/Queue";
import BinarySearchTree, { TraversalOrder } from "./BinarySearchTree";

const seedExpectedBst = (bst: BinarySearchTree<number>): void => {
  bst.insert(30);
  bst.insert(70);
  bst.insert(100);
  bst.insert(60);
  bst.insert(59);
  bst.insert(20);
  bst.insert(45);
  bst.insert(35);
  bst.insert(85);
  bst.insert(105);
  bst.insert(10);
};

let traversalResults: number[] = [];
const traversalIteratorDepth = (v: number): void => {
  traversalResults.push(v);
};

interface TestQueue extends IsQueue<BinarySearchTree<number>> {
  data: BinarySearchTree<number>[],
}

const mockQueue: TestQueue = {
  data: [] as BinarySearchTree<number>[],
  queue(value: BinarySearchTree<number>): void {
    this.data.unshift(value);
  },
  dequeue(): BinarySearchTree<number>|null {
    let node: BinarySearchTree<number>|undefined;
    if (node = this.data.pop()) {
      return node;
    }
    return null;
  }
};
const traversalIteratorBreadth = (v: BinarySearchTree<number>): void => {
  traversalResults.push(v.value);
}

describe("The BinarySearchTree class", () => {

  describe("The constructor() method", () => {

    it("Should create a root node with the provided start value", () => {
      const bst = new BinarySearchTree<number>(50);
      expect(bst.value).toBe(50);
    });
  });

  describe("The insert() method", () => {

    it("Should place a new node to the left of the root node if smaller", () => {
      const bst = new BinarySearchTree<number>(50);
      bst.insert(20);
      expect(bst.leftNode).toBeInstanceOf(BinarySearchTree);
      expect(bst.leftNode?.value).toBe(20);
    });

    it("Should place a new node to the right of the root node if larger", () => {
      const bst = new BinarySearchTree<number>(50);
      bst.insert(80);
      expect(bst.rightNode).toBeInstanceOf(BinarySearchTree);
      expect(bst.rightNode?.value).toBe(80);
    });

    it("Should build the binary search tree structure recursivly", () => {
      const bst = new BinarySearchTree<number>(50);
      bst.insert(30);
      bst.insert(70);
      bst.insert(100);
      bst.insert(60);
      bst.insert(59);
      bst.insert(20);
      bst.insert(45);
      expect(bst.rightNode?.rightNode?.value).toBe(100);
      expect(bst.leftNode?.rightNode?.value).toBe(45);
    });
  });

  describe("The contains() method", () => {

    it("Should be able to find any value contained in the BST", () => {
      const bst = new BinarySearchTree<number>(50);
      seedExpectedBst(bst);
      expect(bst.contains(50)).toBe(true);
      expect(bst.contains(30)).toBe(true);
      expect(bst.contains(59)).toBe(true);
      expect(bst.contains(85)).toBe(true);
      expect(bst.contains(105)).toBe(true);
      expect(bst.contains(40)).toBe(false);
      expect(bst.contains(1000)).toBe(false);
    });
  });

  describe("The depthFirstTraversal() method", () => {

    it("Should traverse the BST in order if the IN_ORDER is provided as order", () => {
      traversalResults = [];
      const bst = new BinarySearchTree<number>(50);
      seedExpectedBst(bst);
      bst.depthFirstTraversal(traversalIteratorDepth, TraversalOrder.IN_ORDER);
      expect(traversalResults).toEqual([10, 20, 30, 35, 45, 50, 59, 60, 70, 85, 100, 105]);
    });

    it("Should traverse the BST in order of traversal if the PRE_ORDER is provided as order", () => {
      traversalResults = [];
      const bst = new BinarySearchTree<number>(50);
      seedExpectedBst(bst);
      bst.depthFirstTraversal(traversalIteratorDepth, TraversalOrder.PRE_ORDER);
      expect(traversalResults).toEqual([50, 30, 20, 10, 45, 35, 70, 60, 59, 100, 85, 105]);
    });

    it("Should traverse the BST from bottom to top and left to right if the POST_ORDER is provided as order", () => {
      traversalResults = [];
      const bst = new BinarySearchTree<number>(50);
      seedExpectedBst(bst);
      bst.depthFirstTraversal(traversalIteratorDepth, TraversalOrder.POST_ODRER);
      expect(traversalResults).toEqual([10, 20, 35, 45, 30, 59, 60, 85, 105, 100, 70, 50]);
    });
  });

  describe("The breadthFirstTraversal() method", () => {

    it("Shoule traverse the BST from top to bottom and left to right", () => {
      traversalResults = [];
      const bst = new BinarySearchTree<number>(50);
      seedExpectedBst(bst);
      bst.breadthFirstTraversal(traversalIteratorBreadth, mockQueue);
      expect(traversalResults).toEqual([50, 30, 70, 20, 45, 60, 100, 10, 35, 59, 85, 105]);
    });
  });
});
