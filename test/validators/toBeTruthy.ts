import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toBeTruthy', () => {
  it('passes when values are truthy', () => {
    expect(true).toBeTruthy()
    expect({}).toBeTruthy()
    expect([]).toBeTruthy()
    expect(42).toBeTruthy()
    expect('foo').toBeTruthy()
    expect(new Date()).toBeTruthy()
    expect(-42).toBeTruthy()
    expect(3.14).toBeTruthy()
    expect(-3.14).toBeTruthy()
    expect(Infinity).toBeTruthy()
    expect(-Infinity).toBeTruthy()
  })

  it('fails when values are not truthy', () => {
    chaiExpect(() => {
      expect(false).toBeTruthy()
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    expect(false).not.toBeTruthy()

    chaiExpect(() => {
      expect(true).not.toBeTruthy()
    }).to.throw(AssertionError)
  })
})