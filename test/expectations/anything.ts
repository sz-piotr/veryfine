import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'

describe('expect.anything', () => {
  const successes = [
    13,
    'abc',
    false,
    {},
    [],
    null
  ]

  for (const value of successes) {
    it(`returns undefined for ${JSON.stringify(value)}`, () => {
      const expectation = expect.anything()
      chaiExpect(expectation(value)).to.equal(undefined)
    })

    it(`returns a string when negated for ${JSON.stringify(value)}`, () => {
      const expectation = expect.not.anything()
      chaiExpect(expectation(value)).to.be.a('string')
    })
  }
})
