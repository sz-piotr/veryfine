import { expect } from '../../src'
import { expect as EXPECT } from 'chai'
import { CHECK, CHECK_EXPECTATION } from './utils'

class Foo {}
class Bar {}
class FooBar extends Foo {}

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
  [function fn () {}, Object, true],
  [1, Number, false],
  ['hi', String, false],
  [true, Boolean, false]
]

describe('expect(value).toBeInstanceOf(constructor)', () => {
  it('validates the 0th argument', () => {
    EXPECT(() => expect(1).toBeInstanceOf('x' as any)).to.throw(TypeError)
  })

  for (const [value, expected, success] of cases) {
    const caseStr = `${JSON.stringify(value)} instanceof ${expected.name}`

    CHECK(success, caseStr, () => {
      expect(value).toBeInstanceOf(expected)
    })

    CHECK(!success, 'negated and ' + caseStr, () => {
      expect(value).not.toBeInstanceOf(expected)
    })
  }
})

describe('expect.toBeInstanceOf(constructor)', () => {
  it('validates the 0th argument', () => {
    EXPECT(() => expect.toBeInstanceOf('x' as any)).to.throw(TypeError)
  })

  for (const [value, expected, success] of cases) {
    const caseStr = `${JSON.stringify(value)} instanceof ${expected.name}`

    CHECK_EXPECTATION(success, caseStr, () => {
      const expectation = expect.toBeInstanceOf(expected)
      return expectation(value)
    })

    CHECK_EXPECTATION(!success, 'negated and ' + caseStr, () => {
      const expectation = expect.not.toBeInstanceOf(expected)
      return expectation(value)
    })
  }
})
