import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toBeGreaterThan', () => {
  it('validates the argument to be a number', () => {
    chaiExpect(() => {
      expect(1).toBeGreaterThan('NOT_A_NUMBER' as any)
    }).to.throw(TypeError)

    chaiExpect(() => {
      expect(1).toBeGreaterThan(NaN)
    }).to.throw(TypeError)
  })

  it('passes when a > b', () => {
    expect(2).toBeGreaterThan(1)
    expect(-1).toBeGreaterThan(-2)
    expect(Infinity).toBeGreaterThan(1)
  })

  it('fails when values a <= b or a is not a number', () => {
    chaiExpect(() => {
      expect(1).toBeGreaterThan(2)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect(1).toBeGreaterThan(1)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect('2').toBeGreaterThan(1)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect('hello').toBeGreaterThan(1)
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    expect(1).not.toBeGreaterThan(2)

    chaiExpect(() => {
      expect(2).not.toBeGreaterThan(1)
    }).to.throw(AssertionError)
  })
})
