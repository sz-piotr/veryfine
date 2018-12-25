import { stringify } from '../stringify'

export function validateTruthy (actual: any) {
  const actualString = stringify(actual)

  return {
    success: !!actual,
    message: `expected ${actualString} to be truthy`,
    negatedMessage: `expected ${actualString} not to be truthy, but it was`
  }
}
