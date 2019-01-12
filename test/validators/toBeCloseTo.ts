import { expect } from '../../src'
import { stringify } from '../../src/utils/stringify'
import { expect as EXPECT } from 'chai'
import { CHECK, CHECK_EXPECTATION } from './utils'

const cases: [any, number, number | undefined, boolean][] = [
  [0.1 + 0.2, 0.3, undefined, true],
  [-0.1 - 0.2, -0.3, undefined, true],
  [0.1 * 0.2, 0.02, undefined, true],
  [0.150 + 0.049, 0.2, 0.01, true],

  [0.1 + 0.2, 0.4, undefined, false],
  [0.150 + 0.049, 0.2, 0.0005, false],
  ['2', 2, undefined, false],
  ['hello', 1, undefined, false]
]

describe('expect(value).toBeCloseTo(target, precision?)', () => {
  it('validates the 0th argument', () => {
    EXPECT(() => expect(1).toBeCloseTo('x' as any)).to.throw(TypeError)
    EXPECT(() => expect(1).toBeCloseTo(NaN as any)).to.throw(TypeError)
  })

  it('validates the 1st argument', () => {
    EXPECT(() => expect(1).toBeCloseTo(1, 'x' as any)).to.throw(TypeError)
    EXPECT(() => expect(1).toBeCloseTo(1, NaN as any)).to.throw(TypeError)
  })

  for (const [value, expected, precision, success] of cases) {
    const caseStr = `${stringify(value)} ~= ${stringify(expected)}`

    CHECK(success, caseStr, () => {
      expect(value).toBeCloseTo(expected, precision)
    })

    CHECK(!success, 'negated and ' + caseStr, () => {
      expect(value).not.toBeCloseTo(expected, precision)
    })
  }
})

describe('expect.toBeCloseTo(target, precision?)', () => {
  it('validates the 0th argument', () => {
    EXPECT(() => expect.toBeCloseTo('x' as any)).to.throw(TypeError)
    EXPECT(() => expect.toBeCloseTo(NaN as any)).to.throw(TypeError)
  })

  it('validates the 1st argument', () => {
    EXPECT(() => expect.toBeCloseTo(1, 'x' as any)).to.throw(TypeError)
    EXPECT(() => expect.toBeCloseTo(1, NaN as any)).to.throw(TypeError)
  })

  for (const [value, expected, precision, success] of cases) {
    const caseStr = `${stringify(value)} ~= ${stringify(expected)}`

    CHECK_EXPECTATION(success, caseStr, () => {
      const expectation = expect.toBeCloseTo(expected, precision)
      return expectation(value)
    })

    CHECK_EXPECTATION(!success, 'negated and ' + caseStr, () => {
      const expectation = expect.not.toBeCloseTo(expected, precision)
      return expectation(value)
    })
  }
})
