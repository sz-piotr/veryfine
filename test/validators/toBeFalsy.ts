import { expect } from '../../src'
import { stringify } from '../../src/utils/stringify'
import { CHECK, CHECK_EXPECTATION } from './utils'

const cases: [any, boolean][] = [
  [false, true],
  [null, true],
  [undefined, true],
  [0, true],
  [NaN, true],
  ['', true],

  [true, false],
  [{}, false],
  [[], false],
  [42, false],
  ['foo', false],
  [new Date(), false],
  [-42, false],
  [3.14, false],
  [-3.14, false],
  [Infinity, false],
  [-Infinity, false]
]

describe('expect(value).toBeFalsy()', () => {
  for (const [value, success] of cases) {
    const caseStr = stringify(value)

    CHECK(success, caseStr, () => {
      expect(value).toBeFalsy()
    })

    CHECK(!success, 'negated and ' + caseStr, () => {
      expect(value).not.toBeFalsy()
    })
  }
})

describe('expect.toBeFalsy()', () => {
  for (const [value, success] of cases) {
    const caseStr = stringify(value)

    CHECK_EXPECTATION(success, caseStr, () => {
      const expectation = expect.toBeFalsy()
      return expectation(value)
    })

    CHECK_EXPECTATION(!success, 'negated and ' + caseStr, () => {
      const expectation = expect.not.toBeFalsy()
      return expectation(value)
    })
  }
})
