import { stringify } from '../stringify'

export function validateLessThanOrEqual (expected: unknown) {
  if (typeof expected !== 'number' || isNaN(expected)) {
    throw new TypeError('argument 0 of .toBeLessThanOrEqual must be a number')
  }

  return function (actual: any) {
    const actualString = stringify(actual)

    if (typeof actual !== 'number' || isNaN(expected)) {
      return {
        success: false,
        message: `expected ${actualString} to be less than or equal to ` +
          `${expected}, but it is not a number`,
        negatedMessage: ''
      }
    }

    return {
      success: actual <= expected,
      message: `expected ${actualString} to be less than or equal to ${expected}`,
      negatedMessage: `expected ${actualString} not to be less than or equal to` +
        `${expected}, but it is`
    }
  }
}
