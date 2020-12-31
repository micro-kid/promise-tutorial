const Queue = require('./Queue.class')
const HighPerformanceQueue = require('./HighPerformanceQueue.class')

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

suite.add('Queue', function () {
  let count = 10
  const arr = new Queue(count)
  while (count--) {
    arr.shift()
  }
}).add('HighPerformanceQueue', function () {
  let count = 10
  const arr = new HighPerformanceQueue(count)
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