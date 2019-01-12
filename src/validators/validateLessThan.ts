import { stringify } from '../utils/stringify'
import { isNumber } from '../utils/isNumber'

export function validateLessThan (expected: unknown) {
  if (!isNumber(expected)) {
    throw new TypeError('argument 0 of .toBeLessThan must be a number')
  }

  return function (actual: any) {
    const actualString = stringify(actual)

    if (!isNumber(actual)) {
      return {
        success: false,
        message: `expected ${actualString} to be less than ${expected}, but it is not a number`,
        negatedMessage: ''
      }
    }

    return {
      success: actual < expected,
      message: `expected ${actualString} to be less than ${expected}`,
      negatedMessage: `expected ${actualString} not to be less than ` +
        `${expected}, but it is`
    }
  }
}
