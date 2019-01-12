import { AssertionError } from '../../src/AssertionError'

function toPromise (fn: Function): Promise<any> {
  try {
    return Promise.resolve(fn())
  } catch (e) {
    return Promise.reject(e)
  }
}

export function PASS (message: string, fn: Function) {
  it('passes when ' + message, async () => {
    return toPromise(fn)
  })
}

export function FAIL (message: string, fn: Function) {
  it('fails when ' + message, async () => {
    return () => toPromise(fn).then(
      () => Promise.reject(new AssertionError('Expected fn to throw')),
      e => {
        if (!(e instanceof AssertionError)) {
          throw new AssertionError('Expected fn to throw AssertionError')
        }
      }
    )
  })
}

export function CHECK (pass: boolean, message: string, fn: Function) {
  const check = pass ? PASS : FAIL
  check(message, fn)
}

export function PASS_EXPECTATION (message: string, fn: () => string | undefined) {
  it('passes when ' + message, () => {
    if (fn() !== undefined) {
      throw new AssertionError('Expectation did not return undefined')
    }
  })
}

export function FAIL_EXPECTATION (message: string, fn: () => string | undefined) {
  it('fails when ' + message, () => {
    if (typeof fn() !== 'string') {
      throw new AssertionError('Expectation did not return a string')
    }
  })
}

export function CHECK_EXPECTATION (
  pass: boolean,
  message: string,
  fn: () => string | undefined
) {
  const check = pass ? PASS_EXPECTATION : FAIL_EXPECTATION
  check(message, fn)
}
