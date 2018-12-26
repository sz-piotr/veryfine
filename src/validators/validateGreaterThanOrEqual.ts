import { stringify } from '../stringify'

export function validateGreaterThanOrEqual (expected: unknown) {
  if (typeof expected !== 'number' || isNaN(expected)) {
    throw new TypeError('argument 0 of .toBeGreaterThanOrEqual must be a number')
  }

  return function (actual: any) {
    const actualString = stringify(actual)

    if (typeof actual !== 'number' || isNaN(expected)) {
      return {
        success: false,
        message: `expected ${actualString} to be greater than or equal to ` +
          `${expected}, but it is not a number`,
        negatedMessage: ''
      }
    }

    return {
      success: actual >= expected,
      message: `expected ${actualString} to be greater than or equal to ${expected}`,
      negatedMessage: `expected ${actualString} not to be greater than or equal to` +
        `${expected}, but it is`
    }
  }
}
