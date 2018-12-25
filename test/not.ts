import { expect } from '../src'
import { expect as chaiExpect } from 'chai'
import { AssertionError } from '../src/AssertionError'

describe('.not', () => {
  it('causes a passing validator to fail', () => {
    chaiExpect(() => {
      expect(1).not.toSatisfy(() => true)
    }).to.throw(AssertionError)
  })

  it('causes a failing validator to pass', () => {
    chaiExpect(() => {
      expect(1).not.toSatisfy(() => false)
    }).not.to.throw()
  })

  it('cannot be chained twice', () => {
    chaiExpect(() => {
      expect(1).not.not.toSatisfy(() => true)
    }).to.throw(TypeError)
  })
})
