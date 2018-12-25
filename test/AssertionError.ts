import { expect as doExpect } from 'chai'
import { expect } from '../src'
import { AssertionError } from '../src/AssertionError'

describe('AssertionError', () => {
  it('can be constructed', () => {
    const error = new AssertionError('message', 'expected', 'actual')
    doExpect(error.name).to.equal('AssertionError')
    doExpect(error.message).to.equal('message')
    doExpect(error.expected).to.equal('expected')
    doExpect(error.actual).to.equal('actual')
    doExpect(error instanceof AssertionError).to.equal(true)
  })

  it('can be constructed with only one parameter', () => {
    const error = new AssertionError('message')
    doExpect(error.name).to.equal('AssertionError')
    doExpect(error.message).to.equal('message')
    doExpect(error.expected).to.equal(undefined)
    doExpect(error.actual).to.equal(undefined)
    doExpect(error instanceof AssertionError).to.equal(true)
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
    doExpect(error.stack)
      .to.match(/^AssertionError: multiline\nmessage\n\s+at Expect.toSatisfy/)
  })

  it('manipulates the stack trace for built in validators', () => {
    let error
    try {
      expect(1).toStrictlyEqual(2)
    } catch (e) {
      error = e
    }
    doExpect(error.stack).to.match(/at Expect.toStrictlyEqual/)
    doExpect(error.stack).not.to.match(/at Expect.toSatisfy/)
  })
})
