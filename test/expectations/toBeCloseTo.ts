import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'

describe('expect.toBeCloseTo', () => {
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

  for (const [value, expected, precision, success] of cases) {
    const caseStr = `${JSON.stringify(value)} ~= ${JSON.stringify(expected)}`
    if (success) {
      it(`returns undefined for ${caseStr}`, () => {
        const expectation = expect.toBeCloseTo(expected, precision)
        chaiExpect(expectation(value)).to.equal(undefined)
      })
      it(`returns a string when negated for ${caseStr}`, () => {
        const expectation = expect.not.toBeCloseTo(expected, precision)
        chaiExpect(expectation(value)).to.be.a('string')
      })
    } else {
      it(`returns a string for ${caseStr}`, () => {
        const expectation = expect.toBeCloseTo(expected, precision)
        chaiExpect(expectation(value)).to.be.a('string')
      })
      it(`returns undefined when negated for ${caseStr}`, () => {
        const expectation = expect.not.toBeCloseTo(expected, precision)
        chaiExpect(expectation(value)).to.equal(undefined)
      })
    }
  }

  it('validates the argument 0', () => {
    chaiExpect(() => expect.toBeCloseTo('x' as any)).to.throw(TypeError)
  })

  it('validates the argument 1', () => {
    chaiExpect(() => expect.toBeCloseTo(1, 'x' as any)).to.throw(TypeError)
  })
})
