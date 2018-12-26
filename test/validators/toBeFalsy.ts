import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toBeFalsy', () => {
  it('passes when values are falsy', () => {
    expect(false).toBeFalsy()
    expect(null).toBeFalsy()
    expect(undefined).toBeFalsy()
    expect(0).toBeFalsy()
    expect(NaN).toBeFalsy()
    expect('').toBeFalsy()
    expect('').toBeFalsy()
    expect(``).toBeFalsy()
  })

  it('fails when values are not falsy', () => {
    chaiExpect(() => {
      expect(true).toBeFalsy()
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    expect(true).not.toBeFalsy()

    chaiExpect(() => {
      expect(false).not.toBeFalsy()
    }).to.throw(AssertionError)
  })
})