import { expect as EXPECT } from 'chai'
import { expect } from '../src'
import { AssertionError } from '../src/AssertionError'

describe('AssertionError', () => {
  it('can be constructed', () => {
    const error = new AssertionError('message', 'expected', 'actual')
    EXPECT(error.name).to.equal('AssertionError')
    EXPECT(error.message).to.equal('message')
    EXPECT(error.expected).to.equal('expected')
    EXPECT(error.actual).to.equal('actual')
    EXPECT(error instanceof AssertionError).to.equal(true)
  })

  it('can be constructed with only one parameter', () => {
    const error = new AssertionError('message')
    EXPECT(error.name).to.equal('AssertionError')
    EXPECT(error.message).to.equal('message')
    EXPECT(error.expected).to.equal(undefined)
    EXPECT(error.actual).to.equal(undefined)
    EXPECT(error instanceof AssertionError).to.equal(true)
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
    EXPECT(error.stack)
      .to.match(/^AssertionError: multiline\nmessage/)
    EXPECT(error.stack).not.to.match(/at Expect.toSatisfy/)
  })

  it('manipulates the stack trace for built in validators', () => {
    let error
    try {
      expect(1).toStrictlyEqual(2)
    } catch (e) {
      error = e
    }
    EXPECT(error.stack).not.to.match(/at Expect.toStrictlyEqual/)
    EXPECT(error.stack).not.to.match(/at Expect.toSatisfy/)
  })
})
