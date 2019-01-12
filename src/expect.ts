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
import { validateHasProperty } from './validators/validateHasProperty'
import { validateCalled } from './validators/validateCalled'
import { validateCalledTimes } from './validators/validateCalledTimes'
import { createExpectation } from './expectation'

class Expect {
  private value: any
  private negated = false

  constructor (value: any) {
    this.value = value
  }

  /**
   * Negates a verifier. The negated verifier fails when the normal would pass
   * and passes when the normal would fail.
   */
  get not () {
    if (!this.negated) {
      this.negated = true
    } else {
      throw new TypeError('Cannot negate an already negated validator.')
    }
    return this
  }

  /**
   * Performs a recursive (deep) equality check. Uses `Object.is` instead of
   * the strict equality operator (`===`). Supports expectations.
   * @param expected value to be recursively compared.
   */
  toEqual (expected: any) {
    return this.toSatisfy(validateEqual(expected))
  }

  /**
   * Performs a strict equality check (using the `===` operator).
   * @param expected value to be checked against.
   */
  toStrictlyEqual (expected: any) {
    return this.toSatisfy(validateStrictlyEqual(expected))
  }

  /**
   * Checks is the value is instance of a given class. Uses the `instanceof`
   * operator.
   * @param constructor target class constructor.
   */
  toBeInstanceOf (constructor: Function) {
    return this.toSatisfy(validateInstanceOf(constructor))
  }

  /**
   * Checks if the value is of a given type. Uses the `typeof` operator.
   * @param type target type.
   */
  toHaveTypeOf (type: string) {
    return this.toSatisfy(validateTypeOf(type))
  }

  /**
   * Checks if the value is truthy (`!!value === true`).
   */
  toBeTruthy () {
    return this.toSatisfy(validateTruthy)
  }

  /**
   * Checks if the value is falsy (`!!value === false`).
   */
  toBeFalsy () {
    return this.toSatisfy(validateFalsy)
  }

  /**
   * Checks if the value is a number greater than target.
   * @param target number to compare the value to.
   */
  toBeGreaterThan (target: number) {
    return this.toSatisfy(validateGreaterThan(target))
  }

  /**
   * Checks if the value is a number greater than or equal to target.
   * @param target number to compare the value to.
   */
  toBeGreaterThanOrEqual (target: number) {
    return this.toSatisfy(validateGreaterThanOrEqual(target))
  }

  /**
   * Checks if the value is a number less than target.
   * @param target number to compare the value to.
   */
  toBeLessThan (target: number) {
    return this.toSatisfy(validateLessThan(target))
  }

  /**
   * Checks if the value is a number less than or equal to target.
   * @param target number to compare the value to.
   */
  toBeLessThanOrEqual (target: number) {
    return this.toSatisfy(validateLessThanOrEqual(target))
  }

  /**
   * Checks if the value is a number close to target within a given precision.
   * @param target number to compare the value to.
   * @param precision (optional) desired precision
   */
  toBeCloseTo (target: number, precision?: number) {
    return this.toSatisfy(validateCloseTo(target, precision))
  }

  /**
   * Checks if the value has a desired property. The property might be nested.
   * Optionally supports passing a desired property value. The value is then
   * checked for deep equality like in `toEqual`.
   * @param path string representing property access. e.g. `"foo.bar[3]"`.
   * @param expected (optional) desired value of the property.
   */
  toHaveProperty (path: string, expected?: any) {
    if (arguments.length === 1) {
      return this.toSatisfy(validateHasProperty(path))
    } else {
      return this.toSatisfy(validateHasProperty(path, expected))
    }
  }

  /**
   * Checks if the value is a `mockFn` that has been called at least once.
   */
  toBeCalled () {
    return this.toSatisfy(validateCalled)
  }

  /**
   * Checks if the value is a `mockFn` that has been called a specific number of
   * times.
   * @param count number of times the `mockFn` has to be called.
   */
  toBeCalledTimes (count: number) {
    return this.toSatisfy(validateCalledTimes(count))
  }

  /**
   * Checks that the value passes the test in the form of a given function.
   * @param validator function that processes the value.
   */
  toSatisfy (validator: Validator): void
  toSatisfy (validator: AsyncValidator): Promise<void>
  toSatisfy (validator: (value: any) => any): any {
    return validateSatisfy(this.value, this.negated, validator)
  }
}

export function expect (value: any) {
  return new Expect(value)
}

/**
 * Always succeeds.
 */
expect.anything = () => createExpectation(false, () => true)

/**
 * Checks if the value is truthy (`!!value === true`).
 */
expect.toBeTruthy = () => createExpectation(false, validateTruthy)

/**
 * Checks if the value is falsy (`!!value === false`).
 */
expect.toBeFalsy = () => createExpectation(false, validateFalsy)

/**
 * Checks if the value is a number greater than target.
 * @param target number to compare the value to.
 */
expect.toBeGreaterThan = (target: number) =>
  createExpectation(false, validateGreaterThan(target))

/**
 * Checks if the value is a number greater than or equal to target.
 * @param target number to compare the value to.
 */
expect.toBeGreaterThanOrEqual = (target: number) =>
  createExpectation(false, validateGreaterThanOrEqual(target))

/**
 * Checks if the value is a number less than target.
 * @param target number to compare the value to.
 */
expect.toBeLessThan = (target: number) =>
  createExpectation(false, validateLessThan(target))

/**
 * Checks if the value is a number less than or equal to target.
 * @param target number to compare the value to.
 */
expect.toBeLessThanOrEqual = (target: number) =>
  createExpectation(false, validateLessThanOrEqual(target))

/**
 * Checks if the value is a number close to target within a given precision.
 * @param target number to compare the value to.
 * @param precision (optional) desired precision
 */
expect.toBeCloseTo = (target: number, precision?: number) =>
  createExpectation(false, validateCloseTo(target, precision))

/**
 * Checks that the value passes the test in the form of a given function.
 * @param validator function that processes the value.
 */
expect.toSatisfy = (validator: Validator) => createExpectation(false, validator)

expect.not = {
  /**
   * Always succeeds.
   */
  anything: () => createExpectation(true, () => true),

  /**
   * Checks if the value is truthy (`!!value === true`).
   */
  toBeTruthy: () => createExpectation(true, validateTruthy),

  /**
   * Checks if the value is falsy (`!!value === false`).
   */
  toBeFalsy: () => createExpectation(true, validateFalsy),

  /**
   * Checks if the value is a number greater than target.
   * @param target number to compare the value to.
   */
  toBeGreaterThan: (target: number) =>
    createExpectation(true, validateGreaterThan(target)),

  /**
   * Checks if the value is a number greater than or equal to target.
   * @param target number to compare the value to.
   */
  toBeGreaterThanOrEqual: (target: number) =>
    createExpectation(true, validateGreaterThanOrEqual(target)),

  /**
   * Checks if the value is a number less than target.
   * @param target number to compare the value to.
   */
  toBeLessThan: (target: number) =>
    createExpectation(true, validateLessThan(target)),

  /**
   * Checks if the value is a number less than or equal to target.
   * @param target number to compare the value to.
   */
  toBeLessThanOrEqual: (target: number) =>
    createExpectation(true, validateLessThanOrEqual(target)),

  /**
   * Checks if the value is a number close to target within a given precision.
   * @param target number to compare the value to.
   * @param precision (optional) desired precision
   */
  toBeCloseTo: (target: number, precision?: number) =>
    createExpectation(true, validateCloseTo(target, precision)),

  /**
   * Checks that the value passes the test in the form of a given function.
   * @param validator function that processes the value.
   */
  toSatisfy: (validator: Validator) => createExpectation(true, validator)
}
