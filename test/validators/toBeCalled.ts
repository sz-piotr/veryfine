import { expect, mockFn } from '../../src'
import { expect as EXPECT } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toBeCalled', () => {
  it('passes when mockFn has been called', () => {
    const fn = mockFn()
    fn()
    expect(fn).toBeCalled()
  })

  it('fails when mockFn has not been called or when value is not a mockFn', () => {
    const fn = mockFn()

    EXPECT(() => {
      expect(fn).toBeCalled()
    }).to.throw(AssertionError)

    EXPECT(() => {
      expect(1).toBeCalled()
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    const fn = mockFn()

    expect(fn).not.toBeCalled()

    EXPECT(() => {
      fn()
      expect(fn).not.toBeCalled()
    }).to.throw(AssertionError)
  })
})
