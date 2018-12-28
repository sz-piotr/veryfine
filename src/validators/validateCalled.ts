import { stringify } from '../utils/stringify'
import { isMockFunction } from '../mock'

export function validateCalled (actual: unknown) {
  const actualString = stringify(actual)

  if (!isMockFunction(actual)) {
    return {
      success: false,
      message: `expected ${actualString} to be called, ` +
        `but it is not a mock function`,
      negatedMessage: ''
    }
  }

  return {
    success: actual.calls.length > 0,
    message: `expected ${actualString} to be called`,
    negatedMessage: `expected ${actualString} not to be called, but it was`
  }
}
