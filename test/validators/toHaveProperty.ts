import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'
import { AssertionError } from '../../src/AssertionError'

const testObject = {
  simple: 1,
  nested: {
    foo: 2,
    bar: undefined
  },
  'ug"ly': [],
  array: [
    {
      deepDown: 'isn\'t it?'
    }
  ]
}

describe('.toHaveProperty', () => {
  it('validates the first argument to be a string and a valid path', () => {
    chaiExpect(() => {
      expect(1).toHaveProperty(1 as any)
    }).to.throw(TypeError)

    chaiExpect(() => {
      expect(1).toHaveProperty('&^@')
    }).to.throw(SyntaxError)
  })

  it('passes when object has property', () => {
    expect(testObject).toHaveProperty('["ug\\"ly"]')
    expect(testObject).toHaveProperty('simple')
    expect(testObject).toHaveProperty('nested.foo')
    expect(testObject).toHaveProperty('nested.bar')
    expect(testObject).toHaveProperty('array[0].deepDown')

    expect(testObject).toHaveProperty('toString')
    expect(testObject).toHaveProperty('toString.toString')

    expect(1).toHaveProperty('toFixed')
  })

  it('passes when object has property with a value', () => {
    expect(testObject).toHaveProperty('["ug\\"ly"]', testObject['ug"ly'])
    expect(testObject).toHaveProperty('simple', testObject.simple)
    expect(testObject).toHaveProperty('nested.foo', testObject.nested.foo)
    expect(testObject).toHaveProperty('nested.bar', testObject.nested.bar)
    expect(testObject).toHaveProperty('array[0].deepDown', testObject.array[0].deepDown)
    expect(testObject).toHaveProperty('toString', testObject.toString)
    expect(testObject).toHaveProperty('toString.toString', testObject.toString.toString)

    expect(1).toHaveProperty('toFixed', Number.prototype.toFixed)
  })

  it('fails when object does not have property', () => {
    chaiExpect(() => {
      expect([]).toHaveProperty('[1]')
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect({}).toHaveProperty('foo.bar')
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect(1).toHaveProperty('baz')
    }).to.throw(AssertionError)
  })

  it('fails when object has property, but the value is not strictly equal', () => {
    chaiExpect(() => {
      expect(testObject).toHaveProperty('nested', 3)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect(testObject).toHaveProperty('nested', {
        foo: 2,
        bar: undefined
      })
    }).to.throw(AssertionError)
  })
})
