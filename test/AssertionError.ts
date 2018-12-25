import { expect as chaiExpect } from 'chai'
import { expect } from '../src'
import { AssertionError } from '../src/AssertionError'

describe('AssertionError', () => {
  it('can be constructed', () => {
    const error = new AssertionError('message', 'expected', 'actual')
    chaiExpect(error.name).to.equal('AssertionError')
    chaiExpect(error.message).to.equal('message')
    chaiExpect(error.expected).to.equal('expected')
    chaiExpect(error.actual).to.equal('actual')
    chaiExpect(error instanceof AssertionError).to.equal(true)
  })

  it('can be constructed with only one parameter', () => {
    const error = new AssertionError('message')
    chaiExpect(error.name).to.equal('AssertionError')
    chaiExpect(error.message).to.equal('message')
    chaiExpect(error.expected).to.equal(undefined)
    chaiExpect(error.actual).to.equal(undefined)
    chaiExpect(error instanceof AssertionError).to.equal(true)
  })

  it('manipulates the stack trace for custom validators', () => {
    let error
    try {
      expect(1).toSatisfy(() => ({
        success: false,
        message: 'multiline\nmessage',
        negatedMessage: ''
      }))
    } catch (e) {
      error = e
    }
    chaiExpect(error.stack)
      .to.match(/^AssertionError: multiline\nmessage\n\s+at Expect.toSatisfy/)
  })

  it('manipulates the stack trace for built in validators', () => {
    let error
    try {
      expect(1).toStrictlyEqual(2)
    } catch (e) {
      error = e
    }
    chaiExpect(error.stack).to.match(/at Expect.toStrictlyEqual/)
    chaiExpect(error.stack).not.to.match(/at Expect.toSatisfy/)
  })
})
