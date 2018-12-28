import { stringify } from '../utils/stringify'

export function validateFalsy (actual: any) {
  const actualString = stringify(actual)

  return {
    success: !actual,
    message: `expected ${actualString} to be falsy`,
    negatedMessage: `expected ${actualString} not to be falsy, but it was`
  }
}
