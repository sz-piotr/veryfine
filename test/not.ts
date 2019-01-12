import { expect } from '../src'
import { expect as EXPECT } from 'chai'
import { AssertionError } from '../src/AssertionError'

describe('.not', () => {
  it('causes a passing validator to fail', () => {
    EXPECT(() => {
      expect(1).not.toSatisfy(() => true)
    }).to.throw(AssertionError)
  })

  it('causes a failing validator to pass', () => {
    EXPECT(() => {
      expect(1).not.toSatisfy(() => false)
    }).not.to.throw()
  })

  it('cannot be chained twice', () => {
    EXPECT(() => {
      expect(1).not.not.toSatisfy(() => true)
    }).to.throw(TypeError)
  })
})
