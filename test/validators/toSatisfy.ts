import { expect } from '../../src'
import { expect as doExpect } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toSatisfy', () => {
  it('fn recieves checked value as argument', () => {
    let value
    expect(1).toSatisfy((arg) => {
      value = arg
      return true
    })
    doExpect(value).to.equal(1)
  })

  it('passes when fn returns true', () => {
    expect(1).toSatisfy(() => true)
  })

  it('fails when negated and fn returns true', () => {
    doExpect(() => {
      expect(1).not.toSatisfy(() => true)
    }).to.throw(AssertionError)
  })

  it('passes when fn returns a Promise<true>', async () => {
    await expect(1).toSatisfy(async () => true)
  })

  it('fails when negated and fn returns a Promise<true>', async () => {
    let error
    try {
      await expect(1).not.toSatisfy(async () => true)
    } catch (e) {
      error = e
    }
    doExpect(error).to.be.instanceOf(AssertionError)
  })

  it('fails when fn does not return true', () => {
    doExpect(() => {
      expect(1).toSatisfy(() => false)
    }).to.throw(AssertionError)
  })

  it('passes when negated fn does not return true', () => {
    doExpect(() => {
      expect(1).not.toSatisfy(() => false)
    }).not.to.throw()
  })

  it('fails when fn returns a Promise<false>', async () => {
    let error
    try {
      await expect(1).toSatisfy(async () => false)
    } catch (e) {
      error = e
    }
    doExpect(error).to.be.instanceOf(AssertionError)
  })

  it('passes when negated and fn returns a Promise<false>', async () => {
    await expect(1).not.toSatisfy(async () => false)
  })

  it('fails with a thrown error', () => {
    const err = new Error('foo')
    doExpect(() => {
      expect(1).toSatisfy(() => { throw err })
    }).to.throw(err)
  })

  it('fails when negated and an error is thrown', () => {
    const err = new Error('foo')
    doExpect(() => {
      expect(1).not.toSatisfy(() => { throw err })
    }).to.throw(err)
  })

  it('fails when fn returns a rejected promise', async () => {
    const err = new Error('foo')
    let caught
    try {
      await expect(1).toSatisfy(() => Promise.reject(err))
    } catch (e) {
      caught = e
    }
    doExpect(caught).to.equal(err)
  })

  it('fails when negated and fn returns a rejected promise', async () => {
    const err = new Error('foo')
    let caught
    try {
      await expect(1).not.toSatisfy(() => Promise.reject(err))
    } catch (e) {
      caught = e
    }
    doExpect(caught).to.equal(err)
  })

  it('passes when fn returns succesful ValidationResult', () => {
    expect(1).toSatisfy(() => ({
      success: true,
      message: '',
      negatedMessage: ''
    }))
  })

  it('fails when negated and fn returns succesful ValidationResult', () => {
    doExpect(() => {
      expect(1).not.toSatisfy(() => ({
        success: true,
        message: '',
        negatedMessage: 'foo'
      }))
    }).to.throw(AssertionError, 'foo')

    let err
    try {
      expect(1).not.toSatisfy(() => ({
        success: true,
        message: '',
        negatedMessage: 'foo',
        expected: 1,
        actual: 2,
      }))
    } catch (e) {
      err = e
    }
    doExpect(err.message).to.equal('foo')
    doExpect(err.expected).to.equal(1)
    doExpect(err.actual).to.equal(2)
  })

  it('fails when fn returns unsuccesful ValidationResult', () => {
    doExpect(() => {
      expect(1).toSatisfy(() => ({
        success: false,
        message: 'foo',
        negatedMessage: ''
      }))
    }).to.throw(AssertionError, 'foo')

    let err
    try {
      expect(1).toSatisfy(() => ({
        success: false,
        message: 'foo',
        negatedMessage: '',
        expected: 1,
        actual: 2,
      }))
    } catch (e) {
      err = e
    }
    doExpect(err.message).to.equal('foo')
    doExpect(err.expected).to.equal(1)
    doExpect(err.actual).to.equal(2)
  })

  it('passes when negated and fn returns unsuccesful ValidationResult', () => {
    expect(1).not.toSatisfy(() => ({
      success: false,
      message: '',
      negatedMessage: ''
    }))
  })

  /// ASYNC

  it('passes when fn returns succesful Promise<ValidationResult>', async () => {
    await expect(1).toSatisfy(async () => ({
      success: true,
      message: '',
      negatedMessage: ''
    }))
  })

  it('fails when negated and fn returns succesful Promise<ValidationResult>', async () => {
    const err1 = new AssertionError('foo')
    let caught1
    try {
      await expect(1).not.toSatisfy(async () => ({
        success: true,
        message: '',
        negatedMessage: 'foo'
      }))
    } catch (e) {
      caught1 = e
    }
    doExpect(caught1.message).to.equal(err1.message)
    doExpect(caught1.expected).to.equal(err1.expected)
    doExpect(caught1.actual).to.equal(err1.actual)


    const err2 = new AssertionError('foo', 1, 2)
    let caught2
    try {
      await expect(1).not.toSatisfy(async () => ({
        success: true,
        message: '',
        negatedMessage: 'foo',
        expected: 1,
        actual: 2
      }))
    } catch (e) {
      caught2 = e
    }
    doExpect(caught2.message).to.equal(err2.message)
    doExpect(caught2.expected).to.equal(err2.expected)
    doExpect(caught2.actual).to.equal(err2.actual)
  })

  it('fails when fn returns unsuccesful Promise<ValidationResult>', async () => {
    const err1 = new AssertionError('foo')
    let caught1
    try {
      await expect(1).toSatisfy(async () => ({
        success: false,
        message: 'foo',
        negatedMessage: ''
      }))
    } catch (e) {
      caught1 = e
    }
    doExpect(caught1.message).to.equal(err1.message)
    doExpect(caught1.expected).to.equal(err1.expected)
    doExpect(caught1.actual).to.equal(err1.actual)


    const err2 = new AssertionError('foo', 1, 2)
    let caught2
    try {
      await expect(1).toSatisfy(async () => ({
        success: false,
        message: 'foo',
        negatedMessage: '',
        expected: 1,
        actual: 2
      }))
    } catch (e) {
      caught2 = e
    }
    doExpect(caught2.message).to.equal(err2.message)
    doExpect(caught2.expected).to.equal(err2.expected)
    doExpect(caught2.actual).to.equal(err2.actual)
  })

  it('passes when negated and fn returns unsuccesful Promise<ValidationResult>', async () => {
    await expect(1).not.toSatisfy(async () => ({
      success: false,
      message: '',
      negatedMessage: ''
    }))
  })
})
