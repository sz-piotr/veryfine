import { expect } from '../../src'
import { expect as EXPECT } from 'chai'
import { CHECK, CHECK_EXPECTATION } from './utils'

const cases: [any, string, boolean][] = [
  [123, 'number', true],
  ['hi', 'string', true],
  [true, 'boolean', true],
  [undefined, 'undefined', true],
  [{ a: 1 }, 'object', true],
  [null, 'object', true],
  [function fn () {}, 'function', true],
  [Symbol(), 'symbol', true],
  [123, 'string', false],
  ['hi', 'boolean', false]
]

describe('expect(value).toHaveTypeOf(type)', () => {
  it('validates the 0th argument', () => {
    EXPECT(() => expect(1).toHaveTypeOf(1 as any)).to.throw(TypeError)
  })

  for (const [value, expected, success] of cases) {
    const caseStr = `${JSON.stringify(value)} instanceof ${JSON.stringify(expected)}`

    CHECK(success, caseStr, () => {
      expect(value).toHaveTypeOf(expected)
    })

    CHECK(!success, 'negated and ' + caseStr, () => {
      expect(value).not.toHaveTypeOf(expected)
    })
  }
})

describe('expect.toHaveTypeOf(type)', () => {
  it('validates the 0th argument', () => {
    EXPECT(() => expect.toHaveTypeOf(1 as any)).to.throw(TypeError)
  })

  for (const [value, expected, success] of cases) {
    const caseStr = `${JSON.stringify(value)} instanceof ${JSON.stringify(expected)}`

    CHECK_EXPECTATION(success, caseStr, () => {
      const expectation = expect.toHaveTypeOf(expected)
      return expectation(value)
    })

    CHECK_EXPECTATION(!success, 'negated and ' + caseStr, () => {
      const expectation = expect.not.toHaveTypeOf(expected)
      return expectation(value)
    })
  }
})
