import { expect, mockFn } from '../../src'
import { expect as EXPECT } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toBeCalledTimes', () => {
  it('validates the argument to be numbers', () => {
    EXPECT(() => {
      expect(1).toBeCalledTimes('NOT_A_NUMBER' as any)
    }).to.throw(TypeError)
  })

  it('passes when mockFn has been called a specified number of times', () => {
    const fn = mockFn()
    expect(fn).toBeCalledTimes(0)
    fn()
    expect(fn).toBeCalledTimes(1)
    fn()
    expect(fn).toBeCalledTimes(2)
  })

  it('fails when mockFn was not been called times or when value is not a mockFn', () => {
    EXPECT(() => {
      expect(mockFn()).toBeCalledTimes(1)
    }).to.throw(AssertionError)

    EXPECT(() => {
      expect(123).toBeCalledTimes(1)
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    const fn = mockFn()

    expect(fn).not.toBeCalledTimes(1)

    EXPECT(() => {
      fn()
      expect(fn).not.toBeCalledTimes(1)
    }).to.throw(AssertionError)
  })
})
