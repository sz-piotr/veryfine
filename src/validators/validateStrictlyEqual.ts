import { fail } from '../fail'
import { stringify } from '../stringify'

export function validateStrictlyEqual (expected: any) {
  return function (value: any) {
    if (expected !== value) {
      fail(
        `expected ${stringify(expected)} to strictly equal ${stringify(value)}`,
        expected,
        value
      )
    }
    return true
  }
}
