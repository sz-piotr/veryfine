import { AssertionError } from '../AssertionError'
import { hasOwnProperty } from '../utils/hasOwnProperty'

export type ValidationResult = {
  success: boolean,
  message: string,
  negatedMessage: string
}
export type Validator = (value: any) => ValidationResult | boolean
export type AsyncValidator = (value: any) => Promise<ValidationResult | boolean>

export function validateSatisfy (
  value: any,
  negated: boolean,
  fn: Validator | AsyncValidator
) {
  const name = fn.name || 'toSatisfy'
  const result = fn(value)
  if (result instanceof Promise) {
    return result.then(value => processResult(value, negated, name))
  }
  return processResult(result, negated, name)
}

function processResult (result: unknown, negated: boolean, name: string) {
  if (isValidationResult(result)) {
    if (result.success && negated) {
      throw new AssertionError(result.negatedMessage)
    } else if (!result.success && !negated) {
      throw new AssertionError(result.message)
    }
  } else {
    if (result && negated) {
      throw new AssertionError(`${name} check succeded, but was expected to fail`)
    } else if (!result && !negated) {
      throw new AssertionError(`${name} check failed`)
    }
  }
}

export function isValidationResult (value: unknown): value is ValidationResult {
  if (value && typeof value === 'object') {
    if (
      hasOwnProperty(value, 'success') &&
      hasOwnProperty(value, 'message') &&
      hasOwnProperty(value, 'negatedMessage')
    ) {
      return true
    } else {
      console.warn(
        'A custom validator returned an object that is not a validation result. ' +
        'This is equivalent to returning false from the validator and should be avoided.'
      )
    }
  }
  return false
}
