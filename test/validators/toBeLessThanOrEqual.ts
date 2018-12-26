import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toBeLessThanOrEqual', () => {
  it('validates the argument to be a number', () => {
    chaiExpect(() => {
      expect(1).toBeLessThanOrEqual('NOT_A_NUMBER' as any)
    }).to.throw(TypeError)

    chaiExpect(() => {
      expect(1).toBeLessThanOrEqual(NaN)
    }).to.throw(TypeError)
  })

  it('passes when a <= b', () => {
    expect(1).toBeLessThanOrEqual(2)
    expect(1).toBeLessThanOrEqual(1)
    expect(-2).toBeLessThanOrEqual(-1)
    expect(-Infinity).toBeLessThanOrEqual(1)
  })

  it('fails when values a > b or a is not a number', () => {
    chaiExpect(() => {
      expect(2).toBeLessThanOrEqual(1)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect('2').toBeLessThanOrEqual(1)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect('hello').toBeLessThanOrEqual(1)
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    expect(2).not.toBeLessThanOrEqual(1)

    chaiExpect(() => {
      expect(1).not.toBeLessThanOrEqual(2)
    }).to.throw(AssertionError)
  })
})
