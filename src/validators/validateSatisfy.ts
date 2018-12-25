import { AssertionError } from '../AssertionError'

export type ValidationResult = {
  success: boolean,
  message: string,
  negatedMessage: string,
  expected?: any,
  actual?: any
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
      throw new AssertionError(result.negatedMessage, result.expected, result.actual)
    } else if (!result.success && !negated) {
      throw new AssertionError(result.message, result.expected, result.actual)
    }
  } else {
    if (result && negated) {
      throw new AssertionError(`${name} check succeded, but was expected to fail`)
    } else if (!result && !negated) {
      throw new AssertionError(`${name} check failed`)
    }
  }
}

function isValidationResult (value: unknown): value is ValidationResult {
  // TODO: print warning for objects
  return value &&
    typeof value === 'object' &&
    hasProperty(value, 'success') &&
    hasProperty(value, 'message') &&
    hasProperty(value, 'negatedMessage')
}

const hasProperty = (value: any, prop: string) =>
  Object.prototype.hasOwnProperty.call(value, prop)
