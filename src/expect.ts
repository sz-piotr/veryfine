import { validateStrictlyEqual } from './validators/validateStrictlyEqual'
import { validateSatisfy, Validator, AsyncValidator } from './validators/validateSatisfy'

export function expect (value: any) {
  return new Expect(value)
}

class Expect {
  private value: any
  private negated = false

  constructor (value: any) {
    this.value = value
  }

  get not () {
    if (!this.negated) {
      this.negated = true
    } else {
      throw new TypeError('Cannot negate an already negated validator.')
    }
    return this
  }

  toStrictlyEqual (expected: any) {
    return this.toSatisfy(validateStrictlyEqual(expected))
  }

  toSatisfy (fn: Validator): void
  toSatisfy (fn: AsyncValidator): Promise<void>
  toSatisfy (fn: (value: any) => any): any {
    return validateSatisfy(this.value, this.negated, fn)
  }
}
