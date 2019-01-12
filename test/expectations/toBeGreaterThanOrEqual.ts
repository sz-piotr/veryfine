import { expect } from '../../src'
import { expect as EXPECT } from 'chai'

describe('expect.toBeGreaterThanOrEqual', () => {
  const cases: [any, number, boolean][] = [
    [2, 1, true],
    [-1, -2, true],
    [Infinity, 1, true],
    [1, 1, true],
    [1, 2, false],
    ['2', 1, false],
    ['hello', 1, false]
  ]

  for (const [value, expected, success] of cases) {
    const caseStr = `${JSON.stringify(value)} >= ${JSON.stringify(expected)}`
    if (success) {
      it(`returns undefined for ${caseStr}`, () => {
        const expectation = expect.toBeGreaterThanOrEqual(expected)
        EXPECT(expectation(value)).to.equal(undefined)
      })
      it(`returns a string when negated for ${caseStr}`, () => {
        const expectation = expect.not.toBeGreaterThanOrEqual(expected)
        EXPECT(expectation(value)).to.be.a('string')
      })
    } else {
      it(`returns a string for ${caseStr}`, () => {
        const expectation = expect.toBeGreaterThanOrEqual(expected)
        EXPECT(expectation(value)).to.be.a('string')
      })
      it(`returns undefined when negated for ${caseStr}`, () => {
        const expectation = expect.not.toBeGreaterThanOrEqual(expected)
        EXPECT(expectation(value)).to.equal(undefined)
      })
    }
  }

  it('validates the argument', () => {
    EXPECT(() => expect.toBeGreaterThanOrEqual('x' as any)).to.throw(TypeError)
  })
})
