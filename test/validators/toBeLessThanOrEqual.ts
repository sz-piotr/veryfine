import { expect } from '../../src'
import { expect as EXPECT } from 'chai'
import { CHECK, CHECK_EXPECTATION } from './utils'

const cases: [any, number, boolean][] = [
  [1, 2, true],
  [-2, -1, true],
  [-Infinity, 1, true],
  [1, 1, true],
  [2, 1, false],
  ['1', 2, false],
  ['hello', 1, false]
]

describe('expect(value).toBeLessThanOrEqual(target)', () => {
  it('validates the 0th argument', () => {
    EXPECT(() => expect(1).toBeLessThanOrEqual('x' as any)).to.throw(TypeError)
    EXPECT(() => expect(1).toBeLessThanOrEqual(NaN as any)).to.throw(TypeError)
  })

  for (const [value, expected, success] of cases) {
    const caseStr = `${JSON.stringify(value)} < ${JSON.stringify(expected)}`

    CHECK(success, caseStr, () => {
      expect(value).toBeLessThanOrEqual(expected)
    })

    CHECK(!success, 'negated and ' + caseStr, () => {
      expect(value).not.toBeLessThanOrEqual(expected)
    })
  }
})

describe('expect.toBeLessThanOrEqual(target)', () => {
  it('validates the 0th argument', () => {
    EXPECT(() => expect.toBeLessThanOrEqual('x' as any)).to.throw(TypeError)
    EXPECT(() => expect.toBeLessThanOrEqual(NaN as any)).to.throw(TypeError)
  })

  for (const [value, expected, success] of cases) {
    const caseStr = `${JSON.stringify(value)} < ${JSON.stringify(expected)}`

    CHECK_EXPECTATION(success, caseStr, () => {
      const expectation = expect.toBeLessThanOrEqual(expected)
      return expectation(value)
    })

    CHECK_EXPECTATION(!success, 'negated and ' + caseStr, () => {
      const expectation = expect.not.toBeLessThanOrEqual(expected)
      return expectation(value)
    })
  }
})
