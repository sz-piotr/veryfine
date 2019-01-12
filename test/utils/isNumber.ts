import { expect } from 'chai'
import { isNumber } from '../../src/utils'

describe('isNumber', () => {
  it('returns true for numbers', () => {
    expect(isNumber(1)).to.equal(true)
    expect(isNumber(-1)).to.equal(true)
    expect(isNumber(0)).to.equal(true)
    expect(isNumber(Infinity)).to.equal(true)
    expect(isNumber(-Infinity)).to.equal(true)
    expect(isNumber(3.14)).to.equal(true)
  })

  it('returns false for non-numbers and NaN', () => {
    expect(isNumber('string')).to.equal(false)
    expect(isNumber(true)).to.equal(false)
    expect(isNumber([])).to.equal(false)
    expect(isNumber({})).to.equal(false)
    expect(isNumber(new Number())).to.equal(false)
    expect(isNumber(NaN)).to.equal(false)
  })
})
