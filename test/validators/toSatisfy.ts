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
    await expect(1).toSatisfy(() => Promise.resolve(true))
  })

  it('fails when negated and fn returns a Promise<true>', async () => {
    let error
    try {
      await expect(1).not.toSatisfy(() => Promise.resolve(true))
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
      await expect(1).toSatisfy(() => Promise.resolve(false))
    } catch (e) {
      error = e
    }
    doExpect(error).to.be.instanceOf(AssertionError)
  })

  it('passes when negated and fn returns a Promise<false>', async () => {
    await expect(1).not.toSatisfy(() => Promise.resolve(false))
  })

  it('fails with a thrown error', () => {
    const err = new Error('foo')
    doExpect(() => {
      expect(1).toSatisfy(() => { throw err; return 1 })
    }).to.throw(err)
  })

  it('passes when negated and an error is thrown', () => {
    expect(1).not.toSatisfy(() => { throw new Error(); return 1 })
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

  it('passes when negated and fn returns a rejected promise', async () => {
    await expect(1).not.toSatisfy(() => Promise.reject())
  })
})
