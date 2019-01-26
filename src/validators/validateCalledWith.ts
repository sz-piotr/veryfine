import { stringify, deepCompare, formatDifferences } from '../utils'
import { isMockFunction } from '../mock'

export function validateCalledWith (expected: unknown[]) {
  return function (actual: unknown) {
    const expectedString = stringify(expected)
    const actualString = stringify(actual)

    if (!isMockFunction(actual)) {
      return {
        success: false,
        message: `expected ${actualString} to be called with ${expectedString}, ` +
          `but it is not a mock function`,
        negatedMessage: ''
      }
    }

    if (actual.calls.length === 0) {
      return {
        success: false,
        message: `expected ${actualString} to be called with ${expectedString}, ` +
          `but it was never called`,
        negatedMessage: ''
      }
    }

    const args = actual.calls[actual.calls.length - 1]

    const differences = deepCompare(
      args,
      expected
    )

    return {
      success: differences.length === 0,
      message: `expected ${actualString} to be called with ${expectedString}, ` +
        `but it was called with ${stringify(args)}\n` +
        formatDifferences(differences),
      negatedMessage: `expected ${actualString} not to be called with ` +
        `${expectedString}, but it was`
    }
  }
}
