import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'

describe('expect.toBeLessThanOrEqual', () => {
  const cases: [any, number, boolean][] = [
    [1, 2, true],
    [-2, -1, true],
    [-Infinity, 1, true],
    [1, 1, true],
    [2, 1, false],
    ['1', 2, false],
    ['hello', 1, false]
  ]

  for (const [value, expected, success] of cases) {
    const caseStr = `${JSON.stringify(value)} <= ${JSON.stringify(expected)}`
    if (success) {
      it(`returns undefined for ${caseStr}`, () => {
        const expectation = expect.toBeLessThanOrEqual(expected)
        chaiExpect(expectation(value)).to.equal(undefined)
      })
      it(`returns a string when negated for ${caseStr}`, () => {
        const expectation = expect.not.toBeLessThanOrEqual(expected)
        chaiExpect(expectation(value)).to.be.a('string')
      })
    } else {
      it(`returns a string for ${caseStr}`, () => {
        const expectation = expect.toBeLessThanOrEqual(expected)
        chaiExpect(expectation(value)).to.be.a('string')
      })
      it(`returns undefined when negated for ${caseStr}`, () => {
        const expectation = expect.not.toBeLessThanOrEqual(expected)
        chaiExpect(expectation(value)).to.equal(undefined)
      })
    }
  }

  it('validates the argument', () => {
    chaiExpect(() => expect.toBeLessThanOrEqual('x' as any)).to.throw(TypeError)
  })
})
