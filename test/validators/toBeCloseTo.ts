import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toBeCloseTo', () => {
  it('validates the arguments to be numbers', () => {
    chaiExpect(() => {
      expect(1).toBeCloseTo('NOT_A_NUMBER' as any)
    }).to.throw(TypeError)

    chaiExpect(() => {
      expect(1).toBeCloseTo(NaN)
    }).to.throw(TypeError)

    chaiExpect(() => {
      expect(1).toBeCloseTo(1, 'NOT_A_NUMBER' as any)
    }).to.throw(TypeError)

    chaiExpect(() => {
      expect(1).toBeCloseTo(1, NaN)
    }).to.throw(TypeError)
  })

  it('passes when a ~= b', () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3)
    expect(-0.1 - 0.2).toBeCloseTo(-0.3)
    expect(0.1 * 0.2).toBeCloseTo(0.02)
    expect(0.150 + 0.049).toBeCloseTo(0.2, 0.01)
  })

  it('fails when values a ~= b or a is not a number', () => {
    chaiExpect(() => {
      expect(0.1 + 0.2).toBeCloseTo(0.4)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect(0.150 + 0.049).toBeCloseTo(0.2, 0.0005)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect('2').toBeCloseTo(2)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect('hello').toBeCloseTo(1)
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    expect(0.1 + 0.2).not.toBeCloseTo(0.4)

    chaiExpect(() => {
      expect(0.1 + 0.2).not.toBeCloseTo(0.3)
    }).to.throw(AssertionError)
  })
})
