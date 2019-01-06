import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'
import { isExpectation } from '../../src/expectation'

describe('expect.satisfies', () => {
  it('returns an expectation', () => {
    const expectation = expect.toSatisfy(() => true)
    chaiExpect(isExpectation(expectation)).to.equal(true);
  })

  it('returns undefined when fn returns true', () => {
    const expectation = expect.toSatisfy(() => true)
    chaiExpect(expectation(0)).to.equal(undefined)
  })

  it('returns a string when negated and fn returns true', () => {
    const expectation = expect.not.toSatisfy(() => true)
    chaiExpect(expectation(0)).to.be.a('string')
  })

  it('returns a string when fn returns false', () => {
    const expectation = expect.toSatisfy(() => false)
    chaiExpect(expectation(0)).to.be.a('string')
  })

  it('returns undefined when negated and fn returns false', () => {
    const expectation = expect.not.toSatisfy(() => false)
    chaiExpect(expectation(0)).to.equal(undefined)
  })

  it('fails with a thrown error', () => {
    const err = new Error('foo')
    chaiExpect(() => {
      expect.toSatisfy(() => { throw err })(0)
    }).to.throw(err)
  })

  it('fails when negated and an error is thrown', () => {
    const err = new Error('foo')
    chaiExpect(() => {
      expect.not.toSatisfy(() => { throw err })(0)
    }).to.throw(err)
  })

  it('returns undefined when fn returns succesful ValidationResult', () => {
    const expectation = expect.toSatisfy(() => ({
      success: true,
      message: '',
      negatedMessage: ''
    }))
    chaiExpect(expectation(0)).to.equal(undefined)
  })

  it('returns a string when negated and fn returns succesful ValidationResult', () => {
    const expectation = expect.not.toSatisfy(() => ({
      success: true,
      message: '',
      negatedMessage: 'foo'
    }))
    chaiExpect(expectation(0)).to.equal('foo')
  })

  it('returns a string when fn returns unsuccesful ValidationResult', () => {
    const expectation = expect.toSatisfy(() => ({
      success: false,
      message: 'foo',
      negatedMessage: ''
    }))
    chaiExpect(expectation(0)).to.equal('foo')
  })

  it('returns undefined when negated and fn returns unsuccesful ValidationResult', () => {
    const expectation = expect.not.toSatisfy(() => ({
      success: false,
      message: '',
      negatedMessage: ''
    }))
    chaiExpect(expectation(0)).to.equal(undefined)
  })
})
