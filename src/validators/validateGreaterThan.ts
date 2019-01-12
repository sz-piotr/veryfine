import { stringify, isNumber } from '../utils'

export function validateGreaterThan (expected: unknown) {
  if (!isNumber(expected)) {
    throw new TypeError('argument 0 of .toBeGreaterThan must be a number')
  }

  return function (actual: any) {
    const actualString = stringify(actual)

    if (!isNumber(actual)) {
      return {
        success: false,
        message: `expected ${actualString} to be greater than ${expected}, but it is not a number`,
        negatedMessage: ''
      }
    }

    return {
      success: actual > expected,
      message: `expected ${actualString} to be greater than ${expected}`,
      negatedMessage: `expected ${actualString} not to be greater than ` +
        `${expected}, but it is`
    }
  }
}
