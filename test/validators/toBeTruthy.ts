import { expect } from '../../src'
import { stringify } from '../../src/utils'
import { CHECK, CHECK_EXPECTATION } from './utils'

const cases: [any, boolean][] = [
  [true, true],
  [{}, true],
  [[], true],
  [42, true],
  ['foo', true],
  [new Date(), true],
  [-42, true],
  [3.14, true],
  [-3.14, true],
  [Infinity, true],
  [-Infinity, true],

  [false, false],
  [null, false],
  [undefined, false],
  [0, false],
  [NaN, false],
  ['', false]
]

describe('expect(value).toBeTruthy()', () => {
  for (const [value, success] of cases) {
    const caseStr = stringify(value)

    CHECK(success, caseStr, () => {
      expect(value).toBeTruthy()
    })

    CHECK(!success, 'negated and ' + caseStr, () => {
      expect(value).not.toBeTruthy()
    })
  }
})

describe('expect.toBeTruthy()', () => {
  for (const [value, success] of cases) {
    const caseStr = stringify(value)

    CHECK_EXPECTATION(success, caseStr, () => {
      const expectation = expect.toBeTruthy()
      return expectation(value)
    })

    CHECK_EXPECTATION(!success, 'negated and ' + caseStr, () => {
      const expectation = expect.not.toBeTruthy()
      return expectation(value)
    })
  }
})
