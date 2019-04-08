const Node = require('./node')

class SingerLinkList {
  constructor() {
    this.header = null
    this.tail = null
  }
  append(value) {
    const node = new Node(value)
    if (!this.header) {
      this.header = node
      this.tail = node
    } else {
      this.tail.next = node
      this.tail = node
    }
    return this
  }
}

const l = new SingerLinkList()
console.log(l.append(1))
console.log(l.append(2))
console.log(l.append(3))
