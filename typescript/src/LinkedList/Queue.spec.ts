import Queue from "./Queue";
import DoubleLinkedListNode from "./DoubleLinkedListNode";

const doubleLinkedListFactory = (v: number) => new DoubleLinkedListNode<number>(v);

describe("The Queue class", () => {

  describe("The queue() method", () => {

    it("Should add a new node as the head and tail of an empty queue", () => {
      const queue = new Queue<number>(doubleLinkedListFactory);
      queue.queue(1);
      expect(queue.queueHead).toBe(queue.queueTail);
    });

    it("Should add a new node as the tail of a queue that is not empty", () => {
      const queue = new Queue<number>(doubleLinkedListFactory);
      queue.queue(1);
      queue.queue(30);
      queue.queue(50);
      expect(queue.queueHead).not.toBe(queue.queueTail);
      expect(queue.queueHead?.nodeValue).toEqual(50);
      expect(queue.queueTail?.nodeValue).toEqual(1);
    });
  });

  describe("The dequeue() method", () => {

    it("Should return null if queue is empty", () => {
      const queue = new Queue<number>(doubleLinkedListFactory);
      expect(queue.dequeue()).toBe(null);
    });

    it("Should return tail and head value if queue has 1 item", () => {
      const queue = new Queue<number>(doubleLinkedListFactory);
      queue.queue(1);
      const dequeued = queue.dequeue();
      expect(dequeued).toEqual(1);
    });

    it("Should return tail value if queue has more than 1 items", () => {
      const queue = new Queue<number>(doubleLinkedListFactory);
      queue.queue(1);
      queue.queue(20);
      queue.queue(30);
      const dequeued1 = queue.dequeue();
      const dequeued2 = queue.dequeue();
      expect(dequeued1).toEqual(1);
      expect(dequeued2).toEqual(20);
    });

    it("Should reset head and tail to null if last item is dequeued", () => {
      const queue = new Queue<number>(doubleLinkedListFactory);
      queue.queue(1);
      queue.dequeue();
      expect(queue.queueTail).toBe(null);
      expect(queue.queueTail).toBe(null);
    })
  });
});