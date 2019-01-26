import { expect, mockFn } from '../../src'
import { PASS, FAIL } from './utils'

describe('.toBeCalledWith', () => {
  PASS('mockFn has been called', () => {
    const fn = mockFn()
    fn()
    expect(fn).toBeCalledWith()
  })

  FAIL('negated and mockFn has been called', () => {
    const fn = mockFn()
    fn()
    expect(fn).not.toBeCalledWith()
  })

  FAIL('mockFn has not been called', () => {
    const fn = mockFn()
    expect(fn).toBeCalledWith()
  })

  PASS('negated and mockFn has not been called', () => {
    const fn = mockFn()
    expect(fn).not.toBeCalledWith()
  })

  FAIL('value is not a mockFn', () => {
    expect(1).toBeCalledWith()
  })

  PASS('negated and value is not a mockFn', () => {
    expect(1).not.toBeCalledWith()
  })

  PASS('mockFn has been called with arguments', () => {
    const fn = mockFn()
    fn(1, { x: 2 })
    expect(fn).toBeCalledWith(1, { x: 2 })
  })

  FAIL('mockFn hasn\'t been called with arguments', () => {
    const fn = mockFn()
    expect(fn).toBeCalledWith(1, { x: 2 })
  })

  FAIL('mockFn hasn\'t been called with arguments most recently', () => {
    const fn = mockFn()
    fn(1, { x: 2 })
    fn(3)
    expect(fn).toBeCalledWith(1, { x: 2 })
  })
})
