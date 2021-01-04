// success
async function fn1() {
  /*
    如果 await 一个 Promise，成功时可以直接将 Promise 的 fulfilled 的值取出
    如果是一个非 Promise 的值，await 可以看作不存在，不会有任何实际的作用。
  */
  const res = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('fulfilled')
    }, 2000)
  })
  console.log(res) // fulfilled
  return res
}
// error
async function fn2() {
  try {
    /* 
      如果 await 的 Promise 的状态为 rejected，那么就会抛出一个同步的错误,
      该错误即使不 try/catch 也不会阻止程序正常运行，因为 async 本质也是
      在函数外部套了一层 Promise，会直接触发 UnhandledPromiseRejectionWarning
    */
    const res = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('rejected')
      }, 2000)
    })
    return res
  } catch (error) {
    console.log(error) // rejected
    return Promise.reject(error)
  }
}
fn1()
fn2()


// 迭代器（Iterator）
// next
// Symbol.iterator

const arr = ['a', 'b', 'c']
const iter1 = arr[Symbol.iterator]()
// 通过next()方法实现每一次的迭代器的遍历
iter1.next() // { value: 'a', done: false }
iter1.next() // { value: 'b', done: false }
iter1.next() // { value: 'c', done: false }
iter1.next() // { value: undefined, done: true }


// Iterator 只是为了给我们提供一个统一的访问接口，所以任何一个普通的对象都是可以实现 Iterator 的，只需要定义Symbol.iterator方法就可以了。
const iterObj = {
  value: 0,
  [Symbol.iterator]() {
    const self = this
    return {
      next() {
        const value = self.value++
        const done = value > 2
        return {
          value: done ? undefined : value,
          done
        }
      }
    }
  }
}

const iter2 = iterObj[Symbol.iterator]()

iter2.next() // { value: 0, done: false }
iter2.next() // { value: 1, done: false }
iter2.next() // { value: 2, done: false }
iter2.next() // { value: undefined, done: true }
iter2.next() // { value: undefined, done: true }

// yield定义状态
// 只代表一个暂停的标志而已
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
// 返回一个迭代器
const g = gen();

console.log(g.next());// { value: 1, done: false }
// 同时该方法还可传递参数，而向一般的迭代器的 return 方法传入参数是没有用的
console.log(g.return('foo'))// { value: "foo", done: true }
console.log(g.next());// { value: undefined, done: true }


function* f(name) {
  const a = yield name
  console.log(a) // 'a'
  const b = yield 2
  console.log(b) // 'b'
}

const g = f('Coloring')
g.next() // { value: 'Coloring', done: false }
