import { expect, mockFn } from '../../src'
import { expect as EXPECT } from 'chai'
import { PASS, FAIL } from './utils'

describe('.toBeCalledTimes', () => {
  it('validates the argument to be numbers', () => {
    EXPECT(() => {
      expect(1).toBeCalledTimes('NOT_A_NUMBER' as any)
    }).to.throw(TypeError)
  })

  PASS('mockFn has been called a specified number of times', () => {
    const fn = mockFn()
    expect(fn).toBeCalledTimes(0)
    fn()
    expect(fn).toBeCalledTimes(1)
    fn()
    expect(fn).toBeCalledTimes(2)
  })

  FAIL('negated and mockFn has been called a specified number of times', () => {
    const fn = mockFn()
    fn()
    expect(fn).not.toBeCalledTimes(1)
  })

  FAIL('mockFn was not been called a specified number of times', () => {
    const fn = mockFn()
    expect(fn).toBeCalledTimes(1)
  })

  PASS('negated and mockFn was not been called a specified number of times', () => {
    const fn = mockFn()
    expect(fn).not.toBeCalledTimes(1)
  })

  FAIL('value is not a mockFn', () => {
    expect(123).toBeCalledTimes(1)
  })

  PASS('negated and value is not a mockFn', () => {
    expect(123).not.toBeCalledTimes(1)
  })
})
