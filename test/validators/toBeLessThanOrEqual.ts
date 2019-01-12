import { expect } from '../../src'
import { expect as EXPECT } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toBeLessThanOrEqual', () => {
  it('validates the argument to be a number', () => {
    EXPECT(() => {
      expect(1).toBeLessThanOrEqual('NOT_A_NUMBER' as any)
    }).to.throw(TypeError)

    EXPECT(() => {
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
    EXPECT(() => {
      expect(2).toBeLessThanOrEqual(1)
    }).to.throw(AssertionError)

    EXPECT(() => {
      expect('2').toBeLessThanOrEqual(1)
    }).to.throw(AssertionError)

    EXPECT(() => {
      expect('hello').toBeLessThanOrEqual(1)
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    expect(2).not.toBeLessThanOrEqual(1)

    EXPECT(() => {
      expect(1).not.toBeLessThanOrEqual(2)
    }).to.throw(AssertionError)
  })
})
