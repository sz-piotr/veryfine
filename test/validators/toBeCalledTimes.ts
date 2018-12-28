import { expect, mockFn } from '../../src'
import { expect as chaiExpect } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toBeCalledTimes', () => {
  it('validates the argument to be numbers', () => {
    chaiExpect(() => {
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
    chaiExpect(() => {
      expect(mockFn()).toBeCalledTimes(1)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect(123).toBeCalledTimes(1)
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    const fn = mockFn()

    expect(fn).not.toBeCalledTimes(1)

    chaiExpect(() => {
      fn()
      expect(fn).not.toBeCalledTimes(1)
    }).to.throw(AssertionError)
  })
})
