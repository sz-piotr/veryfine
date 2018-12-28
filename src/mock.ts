const noOp = () => { }

interface MockFunction {
  (...args: any[]): any,
  calls: any[][],
  returns (value: any): this,
  returnsOnce (value: any): this,
  throws (error?: any): this,
  throwsOnce (error?: any): this,
  resolves (value?: any): this,
  resolvesOnce (value?: any): this,
  rejects (error?: any): this,
  rejectsOnce (error?: any): this
}

export function mockFn (implementation?: Function): MockFunction {
  if (implementation !== undefined && typeof implementation !== 'function') {
    throw new TypeError('argument 0 of mockFn must be a function')
  }

  const mock = function mockFunction (...args: any[]) {
    mock.calls.push(args)
    if (mock.pendingImplementations.length > 0) {
      const implementation = mock.pendingImplementations.shift()
      return implementation!.apply(null, args)
    }
    return mock.implementation.apply(null, args)
  }

  mock.implementation = implementation || noOp
  mock.pendingImplementations = [] as Function[]
  mock.calls = [] as any[][]
  mock.isMockFunction = true

  mock.returns = function (value: any) {
    mock.implementation = () => value
    return mock
  }

  mock.returnsOnce = function (value: any) {
    mock.pendingImplementations.push(() => value)
    return mock
  }

  mock.throws = function (error: any = new Error()) {
    mock.implementation = () => { throw error }
    return mock
  }

  mock.throwsOnce = function (error: any = new Error()) {
    mock.pendingImplementations.push(() => { throw error })
    return mock
  }

  mock.resolves = function (value?: any) {
    mock.implementation = () => Promise.resolve(value)
    return mock
  }

  mock.resolvesOnce = function (value?: any) {
    mock.pendingImplementations.push(() => Promise.resolve(value))
    return mock
  }

  mock.rejects = function (error: any = new Error()) {
    mock.implementation = () => Promise.reject(error)
    return mock
  }

  mock.rejectsOnce = function (error: any = new Error()) {
    mock.pendingImplementations.push(() => Promise.reject(error))
    return mock
  }

  return mock
}

export function isMockFunction (value: unknown): value is MockFunction {
  return typeof value === 'function' && (value as any).isMockFunction
}
