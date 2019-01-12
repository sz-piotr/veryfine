import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'

describe('expect.toHaveTypeOf', () => {
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
    ['hi', 'boolean', false],
  ]

  for (const [value, expected, success] of cases) {
    const caseStr = `${JSON.stringify(value)} ? ${JSON.stringify(expected)}`
    if (success) {
      it(`returns undefined for ${caseStr}`, () => {
        const expectation = expect.toHaveTypeOf(expected)
        chaiExpect(expectation(value)).to.equal(undefined)
      })
      it(`returns a string when negated for ${caseStr}`, () => {
        const expectation = expect.not.toHaveTypeOf(expected)
        chaiExpect(expectation(value)).to.be.a('string')
      })
    } else {
      it(`returns a string for ${caseStr}`, () => {
        const expectation = expect.toHaveTypeOf(expected)
        chaiExpect(expectation(value)).to.be.a('string')
      })
      it(`returns undefined when negated for ${caseStr}`, () => {
        const expectation = expect.not.toHaveTypeOf(expected)
        chaiExpect(expectation(value)).to.equal(undefined)
      })
    }
  }

  it('validates the argument', () => {
    chaiExpect(() => expect.toHaveTypeOf(null as any)).to.throw(TypeError);
  })
})
