import { stringify } from '../stringify'

export function validateStrictlyEqual (expected: any) {
  return function (actual: any) {
    const expectedString = stringify(expected)
    const actualString = stringify(actual)

    return {
      success: expected === actual,
      message: `expected ${actualString} to strictly equal ${expectedString}`,
      negatedMessage: `expected ${actualString} not to strictly equal ` +
        `${expectedString}, but it did`,
      expected,
      actual
    }
  }
}
