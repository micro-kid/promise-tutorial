const TaskPool = require('./Queue.class')

const task = timeout => new Promise((resolve) => setTimeout(() => {
  resolve(timeout)
}, timeout))

const taskList = [1000, 3000, 200, 1300, 800, 2000]

const CONCURRENT_CONTROL_LOG = 'CONCURRENT_CONTROL_TIME'

const cc = new TaskPool(2)

async function startConcurrentControl() {
  console.time(CONCURRENT_CONTROL_LOG)
  // await Promise.all(taskList.map(item => cc.addTask(task, [item])))
  await Promise.all(taskList.map(cc.addTask(task)))
  console.timeEnd(CONCURRENT_CONTROL_LOG)
}

startConcurrentControl() // 5s