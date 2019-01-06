import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'

describe('expect.toBeFalsy', () => {
  const successes = [
    false,
    null,
    undefined,
    0,
    NaN,
    ''
  ]

  for (const value of successes) {
    it(`returns undefined for ${JSON.stringify(value)}`, () => {
      const expectation = expect.toBeFalsy()
      chaiExpect(expectation(value)).to.equal(undefined)
    })

    it(`returns a string when negated for ${JSON.stringify(value)}`, () => {
      const expectation = expect.not.toBeFalsy()
      chaiExpect(expectation(value)).to.be.a('string')
    })
  }

  it('returns a string for true', () => {
    const expectation = expect.toBeFalsy()
    chaiExpect(expectation(true)).to.be.a('string')
  })

  it('returns undefined when negated for true', () => {
    const expectation = expect.not.toBeFalsy()
    chaiExpect(expectation(true)).to.equal(undefined)
  })
})
