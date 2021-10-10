import LinkedList from "./LinkedList";

describe("The LinkedList class", () => {

  describe("The append() method", () => {

    it("Should add a new node to the end of the linked list", () => {
      const linkedList = new LinkedList<String>();
      linkedList.append("Hello");
      let headNode = linkedList.getHeadNode();
      // @ts-ignore
      expect(headNode.nodeData).toEqual("Hello");
      linkedList.append("you");
      headNode = linkedList.getHeadNode();
      // @ts-ignore
      expect(headNode.next().nodeData).toEqual("you");
    });
  });

  describe("The prepend() method", () => {

    it("Should add a new node to the head of the linked list", () => {
      const linkedList = new LinkedList<String>();
      linkedList.prepend("World!");
      let headNode = linkedList.getHeadNode();
      // @ts-ignore
      expect(headNode.nodeData).toEqual("World!");
      linkedList.prepend("Hello");
      headNode = linkedList.getHeadNode();
      // @ts-ignore
      expect(headNode.nodeData).toEqual("Hello");
    });
  });

  describe("The getTailNode() method", () => {

    it("Should return null if linked list is empty", () => {
      const linkedList = new LinkedList<String>();
      const tailNode = linkedList.getTailNode();
      expect(tailNode).toBe(null);
    });

    it("Should return the last element if the linked list is not empty", () => {
      const linkedList = new LinkedList<String>();
      linkedList.prepend("World!");
      linkedList.prepend("beautiful");
      linkedList.prepend("you");
      linkedList.prepend("Hello");
      const tailNode = linkedList.getTailNode();
      expect(tailNode).not.toBe(null);
      // @ts-ignore
      expect(tailNode.nodeData).toEqual("World!");
    });
  });

  describe("The get() method", () => {

    it("Should return null if no object is contained at provided index", () => {
      const linkedList = new LinkedList<String>();
      const stringAtIndex = linkedList.getAtIndex(2);
      expect(stringAtIndex).toBe(null);
    });

    it("Should retrieve the object at the provided index if available", () => {
      const linkedList = new LinkedList<String>();
      linkedList.append("Hello");
      linkedList.append("you");
      linkedList.append("beautiful");
      linkedList.append("World!");
      const stringAtIndex = linkedList.getAtIndex(2);
      expect(stringAtIndex).toEqual("beautiful");
    });
  });

  describe("The removeAtIndex() method", () => {

    it("Should replace the head node if provided index is 0", () => {
      const linkedList = new LinkedList<String>();
      linkedList.append("Hello");
      linkedList.append("you");
      linkedList.append("beautiful");
      linkedList.append("World!");
      linkedList.removeAtIndex(0);
      const stringAtIndex = linkedList.getAtIndex(0);
      expect(stringAtIndex).toEqual("you");
    });

    it("Should rearrange the pointers to remove the element at the provided index", () => {
      const linkedList = new LinkedList<String>();
      linkedList.append("Hello");
      linkedList.append("you");
      linkedList.append("beautiful");
      linkedList.append("World!");
      linkedList.removeAtIndex(1);
      const stringAtIndex = linkedList.getAtIndex(1);
      expect(stringAtIndex).toEqual("beautiful");
    });
  });
});
