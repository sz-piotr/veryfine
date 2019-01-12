import { expect } from '../../src'
import { stringify } from '../../src/utils/stringify'
import { expect as EXPECT } from 'chai'
import { CHECK, CHECK_EXPECTATION } from './utils'

const cases: [any, number, boolean][] = [
  [1, 2, true],
  [-2, -1, true],
  [-Infinity, 1, true],
  [2, 1, false],
  [1, 1, false],
  ['1', 2, false],
  ['hello', 1, false]
]

describe('expect(value).toBeLessThan(target)', () => {
  it('validates the 0th argument', () => {
    EXPECT(() => expect(1).toBeLessThan('x' as any)).to.throw(TypeError)
    EXPECT(() => expect(1).toBeLessThan(NaN as any)).to.throw(TypeError)
  })

  for (const [value, expected, success] of cases) {
    const caseStr = `${stringify(value)} < ${stringify(expected)}`

    CHECK(success, caseStr, () => {
      expect(value).toBeLessThan(expected)
    })

    CHECK(!success, 'negated and ' + caseStr, () => {
      expect(value).not.toBeLessThan(expected)
    })
  }
})

describe('expect.toBeLessThan(target)', () => {
  it('validates the 0th argument', () => {
    EXPECT(() => expect.toBeLessThan('x' as any)).to.throw(TypeError)
    EXPECT(() => expect.toBeLessThan(NaN as any)).to.throw(TypeError)
  })

  for (const [value, expected, success] of cases) {
    const caseStr = `${stringify(value)} < ${stringify(expected)}`

    CHECK_EXPECTATION(success, caseStr, () => {
      const expectation = expect.toBeLessThan(expected)
      return expectation(value)
    })

    CHECK_EXPECTATION(!success, 'negated and ' + caseStr, () => {
      const expectation = expect.not.toBeLessThan(expected)
      return expectation(value)
    })
  }
})
