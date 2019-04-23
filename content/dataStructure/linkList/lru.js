const buckets = require("buckets-js");

class LRU {
  constructor (size) {
    this.linkList = new buckets.LinkedList()
    this.size = size
  }
  add (value) {
    const size = this.linkList.size()
    if (this.linkList.contains(value)) {
      this.linkList.remove(value)
    } else if (size >= this.size) {
      this.linkList.removeElementAtIndex(size - 1)
    }
    this.linkList.add(value, 0)
  }
  toArray () {
    return this.linkList.toArray()
  }
}

const lru = new LRU(2)
lru.add(1)
lru.add(2)
lru.add(1)
console.log(lru.toArray())
