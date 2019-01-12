import { expect, mockFn } from '../../src'
import { PASS, FAIL } from './utils'

describe('.toBeCalled', () => {
  PASS('mockFn has been called', () => {
    const fn = mockFn()
    fn()
    expect(fn).toBeCalled()
  })

  FAIL('negated and mockFn has been called', () => {
    const fn = mockFn()
    fn()
    expect(fn).not.toBeCalled()
  })

  FAIL('mockFn has not been called', () => {
    const fn = mockFn()
    expect(fn).toBeCalled()
  })

  PASS('negated and mockFn has not been called', () => {
    const fn = mockFn()
    expect(fn).not.toBeCalled()
  })

  FAIL('value is not a mockFn', () => {
    expect(1).toBeCalled()
  })

  PASS('negated and value is not a mockFn', () => {
    expect(1).not.toBeCalled()
  })
})
