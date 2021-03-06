import { expect } from '../../src'
import { stringify } from '../../src/utils'
import { expect as EXPECT } from 'chai'
import { CHECK, CHECK_EXPECTATION } from './utils'

const cases: [any, number, boolean][] = [
  [2, 1, true],
  [-1, -2, true],
  [Infinity, 1, true],
  [1, 2, false],
  [1, 1, false],
  ['2', 1, false],
  ['hello', 1, false]
]

describe('expect(value).toBeGreaterThan(target)', () => {
  it('validates the 0th argument', () => {
    EXPECT(() => expect(1).toBeGreaterThan('x' as any)).to.throw(TypeError)
    EXPECT(() => expect(1).toBeGreaterThan(NaN as any)).to.throw(TypeError)
  })

  for (const [value, expected, success] of cases) {
    const caseStr = `${stringify(value)} > ${stringify(expected)}`

    CHECK(success, caseStr, () => {
      expect(value).toBeGreaterThan(expected)
    })

    CHECK(!success, 'negated and ' + caseStr, () => {
      expect(value).not.toBeGreaterThan(expected)
    })
  }
})

describe('expect.toBeGreaterThan(target)', () => {
  it('validates the 0th argument', () => {
    EXPECT(() => expect.toBeGreaterThan('x' as any)).to.throw(TypeError)
    EXPECT(() => expect.toBeGreaterThan(NaN as any)).to.throw(TypeError)
  })

  for (const [value, expected, success] of cases) {
    const caseStr = `${stringify(value)} > ${stringify(expected)}`

    CHECK_EXPECTATION(success, caseStr, () => {
      const expectation = expect.toBeGreaterThan(expected)
      return expectation(value)
    })

    CHECK_EXPECTATION(!success, 'negated and ' + caseStr, () => {
      const expectation = expect.not.toBeGreaterThan(expected)
      return expectation(value)
    })
  }
})
