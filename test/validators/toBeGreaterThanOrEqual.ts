import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toBeGreaterThanOrEqual', () => {
  it('validates the argument to be a number', () => {
    chaiExpect(() => {
      expect(1).toBeGreaterThanOrEqual('NOT_A_NUMBER' as any)
    }).to.throw(TypeError)

    chaiExpect(() => {
      expect(1).toBeGreaterThanOrEqual(NaN)
    }).to.throw(TypeError)
  })

  it('passes when a >= b', () => {
    expect(2).toBeGreaterThanOrEqual(1)
    expect(1).toBeGreaterThanOrEqual(1)
    expect(-1).toBeGreaterThanOrEqual(-2)
    expect(Infinity).toBeGreaterThanOrEqual(1)
  })

  it('fails when values a < b or a is not a number', () => {
    chaiExpect(() => {
      expect(1).toBeGreaterThanOrEqual(2)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect('2').toBeGreaterThanOrEqual(1)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect('hello').toBeGreaterThanOrEqual(1)
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    expect(1).not.toBeGreaterThanOrEqual(2)

    chaiExpect(() => {
      expect(2).not.toBeGreaterThanOrEqual(1)
    }).to.throw(AssertionError)
  })
})
