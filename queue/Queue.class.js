/**
 * 队列
 */
class Queue {
  constructor() {
    this._queue = []
  }

  push(value) {
    return this._queue.push(value)
  }

  shift() {
    return this._queue.shift()
  }
  
  isEmpty() {
    return this._queue.length === 0
  }
}

module.exports = Queue