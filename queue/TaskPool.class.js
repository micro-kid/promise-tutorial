const Queue = require('./Queue.class')
const HighPerformanceQueue = require('./HighPerformanceQueue.class')

/**
 * 任务管理
 */
class DelayedTask {
  constructor(resolve, fn, args) {
    this.resolve = resolve
    this.fn = fn
    this.args = args
  }
}

/**
 * 任务池
 */
class TaskPool {
  constructor(size = 1, useHigh = false) {
    this.size = size
    if (useHigh) {
      this.queue = new HighPerformanceQueue()
    } else {
      this.queue = new Queue()
    }
  }

  addTask(fn) {
    // 高阶函数实现参数的自动透传
    return (...args) => {
      return new Promise((resolve) => {
        this.queue.push(new DelayedTask(resolve, fn, args))

        if (this.size) {
          this.size--
          const { resolve: taskResole, fn: taskFn, args: taskArgs } = this.queue.shift()
          taskResole(this.runTask(taskFn, taskArgs))
        }
      })
    }
  }

  pullTask() {
    if (this.queue.isEmpty()) {
      return
    }
    if (this.size === 0) {
      return
    }
    this.size++
    const { resolve, fn, args } = this.queue.shift()
    resolve(this.runTask(fn, args))
  }

  runTask(fn, args) {
    const result = Promise.resolve(fn(...args))
    result.then(() => {
      this.size--
      this.pullTask()
    }).catch(() => {
      this.size--
      this, pullTask()
    })
    return result
  }
}

module.exports = TaskPool