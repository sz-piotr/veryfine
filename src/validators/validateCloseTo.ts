import { stringify } from '../stringify'
import { isNumber } from '../utils/isNumber'

const DEFAULT_PRECISION = 0.000000001

export function validateCloseTo (expected: unknown, precision: unknown = DEFAULT_PRECISION) {
  if (!isNumber(expected)) {
    throw new TypeError('argument 0 of .toBeCloseTo must be a number')
  }

  if (!isNumber(precision)) {
    throw new TypeError('argument 1 of .toBeCloseTo must be a number')
  }

  return function (actual: any) {
    const actualString = stringify(actual)

    if (!isNumber(actual)) {
      return {
        success: false,
        message: `expected ${actualString} to be close to ${expected}, ` +
          `but it is not a number`,
        negatedMessage: ''
      }
    }

    return {
      success: isCloseTo(actual, expected, precision),
      message: `expected ${actualString} to be close to ${expected}`,
      negatedMessage: `expected ${actualString} not to be close to ` +
        `${expected}, but it is`
    }
  }
}

function isCloseTo (actual: number, expected: number, precision: number) {
  const diff = Math.abs(actual - expected)
  return diff * 2 < precision
}
