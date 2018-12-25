import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'
import { AssertionError } from '../../src/AssertionError'

class Foo {}
class Bar {}
class FooBar extends Foo {}

describe('.toBeInstanceOf', () => {
  it('validates the argument to be a function', () => {
    chaiExpect(() => {
      expect(new Foo()).toBeInstanceOf('NOT_A_FUNCTION' as any)
    }).to.throw(TypeError)
  })

  it('passes when values are instances of argument', () => {
    expect(new Foo()).toBeInstanceOf(Foo)

    expect(new FooBar()).toBeInstanceOf(Foo)
    expect(new Bar()).toBeInstanceOf(Object)

    expect({ a: 1 }).toBeInstanceOf(Object)

    expect([1, 2]).toBeInstanceOf(Array)
    expect([3, 4]).toBeInstanceOf(Object)

    expect(() => {}).toBeInstanceOf(Function)
    expect(function fn () {}).toBeInstanceOf(Object)
  })

  it('fails when values are not instances of argument', () => {
    chaiExpect(() => {
      expect(new Bar()).toBeInstanceOf(Foo)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect(Object.create(null)).toBeInstanceOf(Object)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect(1).toBeInstanceOf(Number)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect('hi').toBeInstanceOf(String)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect(true).toBeInstanceOf(Boolean)
    }).to.throw(AssertionError)
  })

  it('can be negated', () => {
    expect(new Foo()).not.toBeInstanceOf(Bar)

    chaiExpect(() => {
      expect(new Bar()).toBeInstanceOf(Foo)
    }).to.throw(AssertionError)
  })
})
