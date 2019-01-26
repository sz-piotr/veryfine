import { expect } from '../../src'
import { expect as EXPECT } from 'chai'
import { stringify } from '../../src/utils'
import { CHECK } from './utils'

const cases: [any, any, any, boolean][] = [
  [function throwsError() { throw new Error() }, undefined, undefined, true],
  [function throwsError() { throw new Error() }, Error, undefined, true],
  [function throwsErrorX() { throw new Error('x') }, Error, 'x', true],
  [function throwsErrorX() { throw new Error('x') }, Error, /x/, true],

  [function throwsError() { throw new Error() }, TypeError, undefined, false],
  [function throwsTypeErrorY() { throw new TypeError('y') }, TypeError, 'x', false],
  [function throwsTypeErrorY() { throw new TypeError('y') }, TypeError, /x/, false],

  [function () {}, undefined, undefined, false],
  [null, undefined, undefined, false],
  [function () {}, Error, undefined, false],
  [null, Error, undefined, false],
  [function () {}, Error, 'xxxx', false],
  [null, Error, 'xxxx', false],
  [function () {}, Error, /x/, false],
  [null, Error, /x/, false]
]

describe('expect(value).toThrow()', () => {
  it('validates the 0th argument', () => {
    EXPECT(() => expect(1).toThrow('x' as any)).to.throw(TypeError)
  })

  it('validates the 1st argument', () => {
    EXPECT(() => expect(1).toThrow(Error, 1 as any)).to.throw(TypeError)
  })

  it('validates the first must be present when second is', () => {
    EXPECT(() => expect(1).toThrow(undefined, 'x')).to.throw(TypeError)
  })

  for (const [value, constructor, message, success] of cases) {
    const caseStr = `${stringify(value)} - ` +
      `${stringify(constructor)}, ${stringify(message)}`

    CHECK(success, caseStr, () => {
      expect(value).toThrow(constructor, message)
    })

    CHECK(!success, 'negated and ' + caseStr, () => {
      expect(value).not.toThrow(constructor, message)
    })
  }
})
