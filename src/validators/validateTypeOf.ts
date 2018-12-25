import { stringify } from '../stringify'

export function validateTypeOf (type: unknown) {
  if (typeof type !== 'string') {
    throw new TypeError('argument 0 of .toHaveTypeOf must be a string')
  }

  return function (actual: any) {
    const actualString = stringify(actual)

    return {
      success: typeof actual === type,
      message: `expected ${actualString} to be of type ${type}`,
      negatedMessage: `expected ${actualString} not to be of type ${type}, but it is`
    }
  }
}
