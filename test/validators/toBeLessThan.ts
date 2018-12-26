import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toBeLessThan', () => {
  it('validates the argument to be a number', () => {
    chaiExpect(() => {
      expect(1).toBeLessThan('NOT_A_NUMBER' as any)
    }).to.throw(TypeError)

    chaiExpect(() => {
      expect(1).toBeLessThan(NaN)
    }).to.throw(TypeError)
  })

  it('passes when a < b', () => {
    expect(1).toBeLessThan(2)
    expect(-2).toBeLessThan(-1)
    expect(-Infinity).toBeLessThan(1)
  })

  it('fails when values a >= b or a is not a number', () => {
    chaiExpect(() => {
      expect(2).toBeLessThan(1)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect(1).toBeLessThan(1)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect('2').toBeLessThan(1)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect('hello').toBeLessThan(1)
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    expect(2).not.toBeLessThan(1)

    chaiExpect(() => {
      expect(1).not.toBeLessThan(2)
    }).to.throw(AssertionError)
  })
})
