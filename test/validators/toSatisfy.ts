import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toSatisfy', () => {
  it('fn recieves checked value as argument', () => {
    let value
    expect(1).toSatisfy((arg) => {
      value = arg
      return true
    })
    chaiExpect(value).to.equal(1)
  })

  it('passes when fn returns true', () => {
    expect(1).toSatisfy(() => true)
  })

  it('fails when negated and fn returns true', () => {
    chaiExpect(() => {
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
    chaiExpect(error).to.be.instanceOf(AssertionError)
  })

  it('fails when fn does not return true', () => {
    chaiExpect(() => {
      expect(1).toSatisfy(() => false)
    }).to.throw(AssertionError)
  })

  it('passes when negated fn does not return true', () => {
    chaiExpect(() => {
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
    chaiExpect(error).to.be.instanceOf(AssertionError)
  })

  it('passes when negated and fn returns a Promise<false>', async () => {
    await expect(1).not.toSatisfy(async () => false)
  })

  it('fails with a thrown error', () => {
    const err = new Error('foo')
    chaiExpect(() => {
      expect(1).toSatisfy(() => { throw err })
    }).to.throw(err)
  })

  it('fails when negated and an error is thrown', () => {
    const err = new Error('foo')
    chaiExpect(() => {
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
    chaiExpect(caught).to.equal(err)
  })

  it('fails when negated and fn returns a rejected promise', async () => {
    const err = new Error('foo')
    let caught
    try {
      await expect(1).not.toSatisfy(() => Promise.reject(err))
    } catch (e) {
      caught = e
    }
    chaiExpect(caught).to.equal(err)
  })

  it('passes when fn returns succesful ValidationResult', () => {
    expect(1).toSatisfy(() => ({
      success: true,
      message: '',
      negatedMessage: ''
    }))
  })

  it('fails when negated and fn returns succesful ValidationResult', () => {
    chaiExpect(() => {
      expect(1).not.toSatisfy(() => ({
        success: true,
        message: '',
        negatedMessage: 'foo'
      }))
    }).to.throw(AssertionError, 'foo')
  })

  it('fails when fn returns unsuccesful ValidationResult', () => {
    chaiExpect(() => {
      expect(1).toSatisfy(() => ({
        success: false,
        message: 'foo',
        negatedMessage: ''
      }))
    }).to.throw(AssertionError, 'foo')
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
    const err = new AssertionError('foo')
    let caught
    try {
      await expect(1).not.toSatisfy(async () => ({
        success: true,
        message: '',
        negatedMessage: 'foo'
      }))
    } catch (e) {
      caught = e
    }
    chaiExpect(caught.message).to.equal(err.message)
  })

  it('fails when fn returns unsuccesful Promise<ValidationResult>', async () => {
    const err = new AssertionError('foo')
    let caught
    try {
      await expect(1).toSatisfy(async () => ({
        success: false,
        message: 'foo',
        negatedMessage: ''
      }))
    } catch (e) {
      caught = e
    }
    chaiExpect(caught.message).to.equal(err.message)
  })

  it('passes when negated and fn returns unsuccesful Promise<ValidationResult>', async () => {
    await expect(1).not.toSatisfy(async () => ({
      success: false,
      message: '',
      negatedMessage: ''
    }))
  })
})
