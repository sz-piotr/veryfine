interface MockFunction {
  (...args: any[]): any,

  /**
   * Array of arguments passed in each call.
   */
  calls: any[][],

  /**
   * Specify the default behaviour of the mock to return a value.
   * @param value value to return by default.
   */
  returns (value: any): this,

  /**
   * Specify the next behaviour of the mock to return a value.
   * @param value value to return once.
   */
  returnsOnce (value: any): this,

  /**
   * Specify the default behaviour of the mock to throw an error.
   * @param error (optional) error to be thrown by default.
   */
  throws (error?: any): this,

  /**
   * Specify the next behaviour of the mock to throw an error.
   * @param error (optional) error to be thrown once.
   */
  throwsOnce (error?: any): this,

  /**
   * Specify the default behaviour of the mock to return a resolved promise.
   * @param value (optional) value to be contained in the promise.
   */
  resolves (value?: any): this,

  /**
   * Specify the next behaviour of the mock to return a resolved promise.
   * @param value (optional) value to be contained in the promise.
   */
  resolvesOnce (value?: any): this,

  /**
   * Specify the default behaviour of the mock to return a rejected promise.
   * @param error (optional) error to be contained in the promise.
   */
  rejects (error?: any): this,

  /**
   * Specify the next behaviour of the mock to return a rejected promise.
   * @param error (optional) error to be contained in the promise.
   */
  rejectsOnce (error?: any): this
}

/**
 * Create a mock function that remembers calls.
 * @param implementation function to forward calls to.
 */
export function mockFn (implementation: Function = () => {}): MockFunction {
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

  mock.implementation = implementation
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
