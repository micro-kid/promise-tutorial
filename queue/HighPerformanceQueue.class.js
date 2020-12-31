/**
 * 高性能队列
 */
class HighPerformanceQueue {
  constructor(size = 0) {
    this.q1 = new Array(size);
    this.q2 = [];
  }

  push(value) {
    return this.q1.push(value);
  }

  shift() {
    let q2 = this.q2;
    if (q2.length === 0) {
      const q1 = this.q1;
      if (q1.length === 0) {
        return;
      }
      this.q1 = q2;
      q2 = this.q2 = q1.reverse();
    }
    return q2.pop();
  }

  isEmpty() {
    if (this.q1.length === 0 && this.q2.length === 0) {
      return true;
    }
    return false;
  }
}

module.exports = HighPerformanceQueue