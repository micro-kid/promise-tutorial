const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

function generateArray(count){
  return [...Array(count).keys()]
}

suite.add('shift', function () {
  let count = 100
  const arr = generateArray(count)
  while (count--) {
    arr.shift()
  }
}).add('reverse + pop', function () {
  let count = 100
  const arr = generateArray(count)
  arr.reverse()
  while (count--) {
    arr.pop()
  }
}).on('cycle', function (event) {
  console.log(String(event.target))
}).on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
  console.log('\n')
}).run({
  async: true
})