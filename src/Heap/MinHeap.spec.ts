import { Comparable, CompareResult } from "./Heap";
import MinHeap from "./MinHeap";

let subject: MinHeap<number>;

describe("The MinHeap class", () => {
  beforeEach(() => {
    subject = new MinHeap<number>();
  });

  describe("The insert() method", () => {
    it("Should insert the value to an empty heap at position 0", () => {
      const mutableSubject = (subject as unknown) as any;
      const insertVal = 2;
      subject.insert(insertVal);
      expect(mutableSubject.heapData).toHaveLength(1);
      expect(mutableSubject.heapData[0]).toEqual(insertVal);
    });

    it("Should correctly add the first level children of an empty heap", () => {
      const mutableSubject = (subject as unknown) as any;
      const insertVal1 = 50;
      const insertVal2 = 7;
      const insertVal3 = 4;
      subject.insert(insertVal1);
      subject.insert(insertVal2);
      subject.insert(insertVal3);
      expect(mutableSubject.heapData).toHaveLength(3);
      expect(mutableSubject.heapData[0]).toEqual(insertVal3);
      expect(mutableSubject.heapData[1]).toEqual(insertVal1);
      expect(mutableSubject.heapData[2]).toEqual(insertVal2);
    });

    it("Should correctly bubble a minimum value to the root node position", () => {
      const mutableSubject = (subject as unknown) as any;
      mutableSubject.heapData = [4, 50, 7, 55, 90, 87];
      const insertVal = 2;
      subject.insert(insertVal);
      expect(mutableSubject.heapData[0]).toEqual(insertVal);
    });
  });

  describe("The extractRoot() method", () => {
    it("Should correctly reset the heap after pulling the min value", () => {
      const mutableSubject = (subject as unknown) as any;
      mutableSubject.heapData = [2, 50, 23, 88, 90, 32, 74, 96];
      const startHeapData = [...mutableSubject.heapData];
      let result = subject.extractRoot();
      expect(result).toEqual(startHeapData[0]);
      expect(mutableSubject.heapData[0]).toEqual(23);
      result = subject.extractRoot();
      expect(result).toEqual(startHeapData[2]);
      expect(mutableSubject.heapData[0]).toEqual(32);
    });

    it("Should return null from empty heap", () => {
      expect(subject.extractRoot()).toBe(null);
    });

    it("Should return only value from heap with 1 node", () => {
      const mutableSubject = (subject as unknown) as any;
      mutableSubject.heapData = [10];
      expect(subject.extractRoot()).toBe(10);
      expect(mutableSubject.heapData).toHaveLength(0);
    });
  });

  it("Should work as priority queue using a comparator function provided to the constructor", () => {
    enum Priority {
      HIGH,
      MEDIUM,
      LOW,
    };
    type SystemCall = {
      processId: number;
      priority: Priority;
      callFunc: string;
    };
    const getComparatorFunc = null;//(sysCall: SystemCall): Comparable => sysCall?.priority || false;
    const customCompareFunc = (objA: SystemCall, objB: SystemCall): CompareResult => {
      try {
        if (objA.priority < objB.priority) {
          return -1;
        } else if (objA.priority > objB.priority) {
          return 1;
        } else if (objA.processId < objB.processId) {
          return -1;
        } else if (objA.processId > objB.processId) {
          return 1;
        }
      } catch { }
      return 0;
    };
    const subject = new MinHeap<SystemCall>(getComparatorFunc, customCompareFunc);
    const systemCalls = [
      { processId: 0, priority: Priority.LOW, callFunc: "internalProcess0" },
      { processId: 1, priority: Priority.MEDIUM, callFunc: "internalProcess1" },
      { processId: 2, priority: Priority.LOW, callFunc: "internalProcess2" },
      { processId: 3, priority: Priority.HIGH, callFunc: "internalProcess3" },
      { processId: 4, priority: Priority.LOW, callFunc: "internalProcess4" },
      { processId: 5, priority: Priority.HIGH, callFunc: "internalProcess5" },
      { processId: 6, priority: Priority.MEDIUM, callFunc: "internalProcess6" },
      { processId: 7, priority: Priority.MEDIUM, callFunc: "internalProcess7" },
      { processId: 8, priority: Priority.LOW, callFunc: "internalProcess8" },
      { processId: 9, priority: Priority.HIGH, callFunc: "internalProcess9" },
    ];
    subject.initFromArray(systemCalls);
    const expectedResultOrder = [3, 5, 9, 1, 6, 7, 0, 2, 4, 8];
    const actualResultOrder = [];
    for (let i = 0; i < expectedResultOrder.length; i++) {
      const result = subject.extractRoot();
      actualResultOrder.push(result);
    }
    for (let i = 0; i < expectedResultOrder.length; i++) {
      expect(actualResultOrder[i]?.callFunc).toEqual("internalProcess" + expectedResultOrder[i]);
    }
  });
});
