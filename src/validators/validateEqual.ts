import { stringify } from '../utils/stringify'
import { deepCompare, Difference } from '../utils/deepCompare'

export function validateEqual (expected: any) {
  return function (actual: any) {
    const expectedString = stringify(expected)
    const actualString = stringify(actual)

    const differences = deepCompare(actual, expected)

    return {
      success: differences.length === 0,
      message: `expected ${actualString} to equal ${expectedString}\n` +
        differences.map(formatDifference).join('\n'),
      negatedMessage: `expected ${actualString} not to equal ` +
        `${expectedString}, but it did`
    }
  }
}

function formatDifference ({ path, message }: Difference) {
  if (path) {
    return `      - ${path} | ${message}`
  }
  return `      - ${message}`
}
