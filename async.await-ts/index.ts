/**
 * 实现一个 async/await （typescript版）
 * 流程图：https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24fad07ac8b34798a3344f8152695842~tplv-k3u1fbpfcp-watermark.image
 */

type ResolveValue<T> = T extends PromiseLike<infer V> ? V : T

function _asyncToGenerator<R, T = unknown, A extends Array<any> = Array<any>>(
  fn: (...args: A) => Generator<T, R, any>
): (...args: A) => Promise<ResolveValue<R>> {
  return function (this: void, ...args) {
    const self = this
    return new Promise(function (resolve, reject) {
      // 获取实例 
      const gen = fn.apply(self, args)
      // 执行下一步
      function _next(...nextArgs: [] | [T]) {
        asyncGeneratorStep(
          gen,
          resolve,
          reject,
          _next,
          _throw,
          'next',
          ...nextArgs
        )
      }
      // 抛出异常
      function _throw(err: any) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err)
      }
      // 启动迭代器
      _next()
    })
  }
}

function asyncGeneratorStep<
  R,
  TNext = unknown,
  T extends Generator = Generator
>(
  gen: T,
  resolve: (value: R) => void,
  reject: (reason?: any) => void,
  _next: (...args: [] | [TNext]) => void,
  _throw: (err: any) => void,
  key: 'next' | 'throw',
  arg?: any
): void {
  try {
    const { value, done } = gen[key](arg)
    if (done) {
      resolve(value)
    } else {
      Promise.resolve(value).then(_next, _throw)
    }
  } catch (error) {
    reject(error)
  }
}


export default _asyncToGenerator