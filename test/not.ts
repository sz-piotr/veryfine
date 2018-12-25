import { expect } from '../src'
import { expect as doExpect } from 'chai'
import { AssertionError } from '../src/AssertionError'

describe('.not', () => {
  it('causes a passing validator to fail', () => {
    doExpect(() => {
      expect(1).not.toSatisfy(() => true)
    }).to.throw(AssertionError)
  })

  it('causes a failing validator to pass', () => {
    doExpect(() => {
      expect(1).not.toSatisfy(() => false)
    }).not.to.throw()
  })

  it('cannot be chained twice', () => {
    doExpect(() => {
      expect(1).not.not.toSatisfy(() => true)
    }).to.throw(TypeError)
  })
})
