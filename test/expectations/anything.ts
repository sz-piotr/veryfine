import { expect } from '../../src'
import { expect as EXPECT } from 'chai'

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
      EXPECT(expectation(value)).to.equal(undefined)
    })

    it(`returns a string when negated for ${JSON.stringify(value)}`, () => {
      const expectation = expect.not.anything()
      EXPECT(expectation(value)).to.be.a('string')
    })
  }
})
