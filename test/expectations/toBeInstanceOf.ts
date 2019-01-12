import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'

class Foo {}
class Bar {}
class FooBar extends Foo {}

describe('expect.toBeInstanceOf', () => {
  const cases: [any, Function, boolean][] = [
    [new Foo(), Foo, true],
    [new Bar(), Foo, false],
    [new FooBar(), Foo, true],
    [new Bar(), Object, true],
    [{ a: 1 }, Object, true],
    [Object.create(null), Object, false],
    [[1, 2], Array, true],
    [[3, 4], Object, true],
    [() => {}, Function, true],
    [function fn() {}, Object, true],
    [1, Number, false],
    ['hi', String, false],
    [true, Boolean, false]
  ]

  for (const [value, expected, success] of cases) {
    const caseStr = `${JSON.stringify(value)} ? ${JSON.stringify(expected)}`
    if (success) {
      it(`returns undefined for ${caseStr}`, () => {
        const expectation = expect.toBeInstanceOf(expected)
        chaiExpect(expectation(value)).to.equal(undefined)
      })
      it(`returns a string when negated for ${caseStr}`, () => {
        const expectation = expect.not.toBeInstanceOf(expected)
        chaiExpect(expectation(value)).to.be.a('string')
      })
    } else {
      it(`returns a string for ${caseStr}`, () => {
        const expectation = expect.toBeInstanceOf(expected)
        chaiExpect(expectation(value)).to.be.a('string')
      })
      it(`returns undefined when negated for ${caseStr}`, () => {
        const expectation = expect.not.toBeInstanceOf(expected)
        chaiExpect(expectation(value)).to.equal(undefined)
      })
    }
  }

  it('validates the argument', () => {
    chaiExpect(() => expect.toBeInstanceOf('x' as any)).to.throw(TypeError);
  })
})
