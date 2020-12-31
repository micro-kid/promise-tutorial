/**
 * 队列
 */
class Queue {
  constructor(size = 0) {
    this._queue = new Array(size)
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