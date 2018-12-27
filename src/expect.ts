import { validateSatisfy, Validator, AsyncValidator } from './validators/validateSatisfy'
import { validateEqual } from './validators/validateEqual'
import { validateStrictlyEqual } from './validators/validateStrictlyEqual'
import { validateInstanceOf } from './validators/validateInstanceOf'
import { validateTypeOf } from './validators/validateTypeOf'
import { validateTruthy } from './validators/validateTruthy'
import { validateFalsy } from './validators/validateFalsy'
import { validateGreaterThan } from './validators/validateGreaterThan'
import { validateGreaterThanOrEqual } from './validators/validateGreaterThanOrEqual'
import { validateLessThan } from './validators/validateLessThan'
import { validateLessThanOrEqual } from './validators/validateLessThanOrEqual'
import { validateCloseTo } from './validators/validateCloseTo'

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

  toEqual (expected: any) {
    return this.toSatisfy(validateEqual(expected))
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

  toBeGreaterThan (value: number) {
    return this.toSatisfy(validateGreaterThan(value))
  }

  toBeGreaterThanOrEqual (value: number) {
    return this.toSatisfy(validateGreaterThanOrEqual(value))
  }

  toBeLessThan (value: number) {
    return this.toSatisfy(validateLessThan(value))
  }

  toBeLessThanOrEqual (value: number) {
    return this.toSatisfy(validateLessThanOrEqual(value))
  }

  toBeCloseTo (value: number, precision?: number) {
    return this.toSatisfy(validateCloseTo(value, precision))
  }

  toSatisfy (fn: Validator): void
  toSatisfy (fn: AsyncValidator): Promise<void>
  toSatisfy (fn: (value: any) => any): any {
    return validateSatisfy(this.value, this.negated, fn)
  }
}
