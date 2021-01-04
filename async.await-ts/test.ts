import _asyncToGenerator from './index'

const asyncFunc = _asyncToGenerator(function* (param: string) {
  try {
    yield new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        reject(param)
      }, 1000)
    })
  } catch (error) {
    console.log(error)
  }

  const a: string = yield 'a'
  const d: string = yield 'd'
  const b: string = yield Promise.resolve('b')
  const c: string = yield Promise.resolve('c')
  return [a, b, c, d]
})

asyncFunc('error').then((res) => {
  console.log(res)
})

// error
// ['a', 'b', 'c', 'd']
