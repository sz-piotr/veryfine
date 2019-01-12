import { expect } from '../../src'
import { expect as EXPECT } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toHaveTypeOf', () => {
  it('validates the argument to be a string', () => {
    EXPECT(() => {
      expect(1).toHaveTypeOf(1 as any)
    }).to.throw(TypeError)
  })

  it('passes when values have the specified type', () => {
    expect(123).toHaveTypeOf('number')
    expect('hi').toHaveTypeOf('string')
    expect(true).toHaveTypeOf('boolean')
    expect(undefined).toHaveTypeOf('undefined')
    expect({ a: 1 }).toHaveTypeOf('object')
    expect(null).toHaveTypeOf('object')
    expect(function fn () {}).toHaveTypeOf('function')
    expect(Symbol()).toHaveTypeOf('symbol')
  })

  it('fails when values do not have have the specified type', () => {
    EXPECT(() => {
      expect(123).toHaveTypeOf('string')
    }).to.throw(AssertionError)

    EXPECT(() => {
      expect('hi').toHaveTypeOf('boolean')
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    expect(123).not.toHaveTypeOf('string')

    EXPECT(() => {
      expect(123).not.toHaveTypeOf('number')
    }).to.throw(AssertionError)
  })
})
