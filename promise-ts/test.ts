import MyPromise from "./index"

// 同步
new MyPromise((reslove, reject) => {
  reslove('success')
}).then(
  (res) => {
    console.log('sync: ' + res) // success
  },
  (err) => {
    console.log(err)
  }
)

// 异步
new MyPromise((reslove, reject) => {
  setTimeout(() => {
    reslove('timeout success')
  }, 2000)
}).then(
  (res) => {
    console.log('async: ' + res) // timeout success
  },
  (err) => {
    console.log(err)
  }
)

// 链式
new MyPromise<void>((resolve) => {
  resolve()
})
  .then(() => {
    return 'step1'
  })
  .then((res) => {
    return res + ' -> ' + 'step2'
  })
  .then((res) => {
    return res + ' -> ' + 'step3'
  })
  .then((res) => {
    console.log('chain: ' + res) // step1:step2
  })

// 穿透
new MyPromise((reslove) => {
  reslove('hello')
})
  .then()
  .then()
  .then()
  .then((res) => {
    console.log('value penetration: ' + res) // 'hello'
  })
