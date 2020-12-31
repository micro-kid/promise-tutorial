const task = timeout => new Promise((resolve) => setTimeout(() => {
  resolve(timeout)
}, timeout))

const taskList = [1000, 3000, 200, 1300, 800, 2000]

const NO_CONCURRENT_CONTROL_LOG = 'NO_CONCURRENT_CONTROL_TIME'

async function startNoConcurrentControl() {
  console.time(NO_CONCURRENT_CONTROL_LOG)
  await Promise.all(taskList.map(item => task(item)))
  console.timeEnd(NO_CONCURRENT_CONTROL_LOG)
}

startNoConcurrentControl() // 3s

