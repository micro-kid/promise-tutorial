const Queue = require('./Queue.class')
const HighPerformanceQueue = require('./HighPerformanceQueue.class')

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

function generateQueue(queueFn, count) {
  let queue = new queueFn()
  for (let index = 0; index < count; index++) {
    queue.push(index)
  }
  return queue
}

suite.add('Queue', function () {
  let count = 100
  const arr = generateQueue(Queue, count)
  while (count--) {
    arr.shift()
  }
}).add('HighPerformanceQueue', function () {
  let count = 100
  const arr = generateQueue(HighPerformanceQueue, count)
  while (count--) {
    arr.shift()
  }
}).on('cycle', function (event) {
  console.log(String(event.target))
}).on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
  console.log('\n')
}).run({
  async: true
})