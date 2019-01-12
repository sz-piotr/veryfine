import { expect } from '../../src'
import { expect as EXPECT } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toBeGreaterThan', () => {
  it('validates the argument to be a number', () => {
    EXPECT(() => {
      expect(1).toBeGreaterThan('NOT_A_NUMBER' as any)
    }).to.throw(TypeError)

    EXPECT(() => {
      expect(1).toBeGreaterThan(NaN)
    }).to.throw(TypeError)
  })

  it('passes when a > b', () => {
    expect(2).toBeGreaterThan(1)
    expect(-1).toBeGreaterThan(-2)
    expect(Infinity).toBeGreaterThan(1)
  })

  it('fails when values a <= b or a is not a number', () => {
    EXPECT(() => {
      expect(1).toBeGreaterThan(2)
    }).to.throw(AssertionError)

    EXPECT(() => {
      expect(1).toBeGreaterThan(1)
    }).to.throw(AssertionError)

    EXPECT(() => {
      expect('2').toBeGreaterThan(1)
    }).to.throw(AssertionError)

    EXPECT(() => {
      expect('hello').toBeGreaterThan(1)
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    expect(1).not.toBeGreaterThan(2)

    EXPECT(() => {
      expect(2).not.toBeGreaterThan(1)
    }).to.throw(AssertionError)
  })
})
