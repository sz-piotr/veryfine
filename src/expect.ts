import { validateSatisfy, Validator, AsyncValidator } from './validators/validateSatisfy'
import { validateStrictlyEqual } from './validators/validateStrictlyEqual'
import { validateInstanceOf } from './validators/validateInstanceOf'
import { validateTypeOf } from './validators/validateTypeOf'
import { validateTruthy } from './validators/validateTruthy'
import { validateFalsy } from './validators/validateFalsy'

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

  toBeInstanceOf (constructor: Function) {
    return this.toSatisfy(validateInstanceOf(constructor))
  }

  toHaveTypeOf (type: string) {
    return this.toSatisfy(validateTypeOf(type))
  }

  toBeTruthy () {
    return this.toSatisfy(validateTruthy)
  }

  toBeFalsy () {
    return this.toSatisfy(validateFalsy)
  }

  toSatisfy (fn: Validator): void
  toSatisfy (fn: AsyncValidator): Promise<void>
  toSatisfy (fn: (value: any) => any): any {
    return validateSatisfy(this.value, this.negated, fn)
  }
}
