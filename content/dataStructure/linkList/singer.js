const Node = require("./node");

class SingerLinkList {
  constructor() {
    this.header = null;
    this.tail = null;
  }
  append(value) {
    const node = new Node(value);
    if (!this.header) {
      this.header = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    return this;
  }
  prepend(value) {
    if (!this.header) {
      this.header = node;
      this.tail = node;
    } else {
      this.header = new Node(value, this.header);
    }
    return this;
  }
  deleteTail() {
    if (!this.header) return this;
    let node = this.header;
    while (node) {
      if (node.next === this.tail) {
        node.next = null;
        this.tail = node;
        node = null;
      } else {
        node = node.next;
      }
    }
    return this;
  }
  deleteHeader() {
    if (!this.header) return this;
    this.header = this.header.next;
    return this;
  }
  delete(value) {
    if (!this.header) return this;
    let node = this.header;
    let lastNode = null;
    while (node) {
      if (node.value === value) {
        if (!lastNode) {
          this.header = this.header.next;
        } else if (node === this.tail) {
          lastNode.next = null;
          this.tail = lastNode;
        } else {
          lastNode.next = node.next;
        }
        node = null;
      } else {
        lastNode = node;
        node = node.next;
      }
    }
    return this;
  }
  find(value) {
    if (!this.header) return this;
    let node = this.header;
    let findNode = null;
    while (node) {
      if (node.value === value) {
        findNode = node;
        node = null;
      } else {
        node = node.next;
      }
    }
    return findNode;
  }
  reverse() {
    if (!this.header) return this;
    let node = this.header;
    let preNode = null;
    let nextNode = null;
    while (node) {
      // 存储下一个节点
      nextNode = node.next;
      // 之前的节点应该是当前节点的下一个节点
      node.next = preNode;
      preNode = node;
      node = nextNode;
    }
    this.tail = this.header;
    this.header = preNode;
    return this;
  }
}

const l = new SingerLinkList();
console.log(l.append(1));
console.log(l.append(2));
console.log(l.append(3));
console.log(l.prepend(0));
console.log(l.reverse());
