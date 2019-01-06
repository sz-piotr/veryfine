import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'

describe('expect.toBeTruthy', () => {
  const successes = [
    true,
    {},
    [],
    42,
    'foo',
    new Date(),
    -42,
    3.14,
    -3.14,
    Infinity,
    -Infinity,
  ]

  for (const value of successes) {
    it(`returns undefined for ${JSON.stringify(value)}`, () => {
      const expectation = expect.toBeTruthy()
      chaiExpect(expectation(value)).to.equal(undefined)
    })

    it(`returns a string when negated for ${JSON.stringify(value)}`, () => {
      const expectation = expect.not.toBeTruthy()
      chaiExpect(expectation(value)).to.be.a('string')
    })
  }

  it('returns a string for false', () => {
    const expectation = expect.toBeTruthy()
    chaiExpect(expectation(false)).to.be.a('string')
  })

  it('returns undefined when negated for false', () => {
    const expectation = expect.not.toBeTruthy()
    chaiExpect(expectation(false)).to.equal(undefined)
  })
})
