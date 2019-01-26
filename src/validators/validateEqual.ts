import { stringify, deepCompare, formatDifferences } from '../utils'

export function validateEqual (expected: any) {
  return function (actual: any) {
    const expectedString = stringify(expected)
    const actualString = stringify(actual)

    const differences = deepCompare(actual, expected)

    return {
      success: differences.length === 0,
      message: `expected ${actualString} to equal ${expectedString}\n` +
        formatDifferences(differences),
      negatedMessage: `expected ${actualString} not to equal ` +
        `${expectedString}, but it did`
    }
  }
}
