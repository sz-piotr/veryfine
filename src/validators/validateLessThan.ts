import { stringify } from '../stringify'

export function validateLessThan (expected: unknown) {
  if (typeof expected !== 'number' || isNaN(expected)) {
    throw new TypeError('argument 0 of .toBeLessThan must be a number')
  }

  return function (actual: any) {
    const actualString = stringify(actual)

    if (typeof actual !== 'number' || isNaN(expected)) {
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
