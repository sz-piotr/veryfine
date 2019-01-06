import { Validator, isValidationResult } from './validators/validateSatisfy'

export type Expectation = (value: any) => string | undefined

export function createExpectation(negated: boolean, fn: Validator): Expectation {
  function expectation(value: any) {
    const name = fn.name || 'satisfies'
    const result = fn(value)

    if (isValidationResult(result)) {
      if (result.success && negated) {
        return result.negatedMessage
      } else if (!result.success && !negated) {
        return result.message
      }
    } else {
      if (result && negated) {
        return `${name} expectation succeded, but was expected to fail`
      } else if (!result && !negated) {
        return `${name} expectation failed`
      }
    }
  }

  expectation.isExpectation = true
  return expectation
}

export function isExpectation(value: any): value is Expectation {
  return typeof value === 'function' && value.isExpectation === true
}
