import { expect } from '../../src'
import { expect as EXPECT } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toBeLessThan', () => {
  it('validates the argument to be a number', () => {
    EXPECT(() => {
      expect(1).toBeLessThan('NOT_A_NUMBER' as any)
    }).to.throw(TypeError)

    EXPECT(() => {
      expect(1).toBeLessThan(NaN)
    }).to.throw(TypeError)
  })

  it('passes when a < b', () => {
    expect(1).toBeLessThan(2)
    expect(-2).toBeLessThan(-1)
    expect(-Infinity).toBeLessThan(1)
  })

  it('fails when values a >= b or a is not a number', () => {
    EXPECT(() => {
      expect(2).toBeLessThan(1)
    }).to.throw(AssertionError)

    EXPECT(() => {
      expect(1).toBeLessThan(1)
    }).to.throw(AssertionError)

    EXPECT(() => {
      expect('2').toBeLessThan(1)
    }).to.throw(AssertionError)

    EXPECT(() => {
      expect('hello').toBeLessThan(1)
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    expect(2).not.toBeLessThan(1)

    EXPECT(() => {
      expect(1).not.toBeLessThan(2)
    }).to.throw(AssertionError)
  })
})
