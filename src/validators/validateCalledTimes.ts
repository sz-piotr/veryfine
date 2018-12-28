import { stringify } from '../utils/stringify'
import { isNumber } from '../utils/isNumber'
import { isMockFunction } from '../mock'

export function validateCalledTimes (count: unknown) {
  if (!isNumber(count)) {
    throw new TypeError('argument 0 of .toBeCalledTimes must be a number')
  }

  return function (actual: unknown) {
    const actualString = stringify(actual)

    if (!isMockFunction(actual)) {
      return {
        success: false,
        message: `expected ${actualString} to be called ${count} times, ` +
          `but it is not a mock function`,
        negatedMessage: ''
      }
    }

    return {
      success: actual.calls.length === count,
      message: `expected ${actualString} to be called ${count} times, but ` +
        `it was called ${actual.calls.length} times`,
      negatedMessage: `expected ${actualString} not to be called ${count} ` +
        `times, but it was`
    }
  }
}
