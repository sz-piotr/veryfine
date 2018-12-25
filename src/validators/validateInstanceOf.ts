import { stringify } from '../stringify'

export function validateInstanceOf (constructor: unknown) {
  if (typeof constructor !== 'function') {
    throw new TypeError('argument 0 of .toBeInstanceOf must be a function')
  }

  return function (actual: any) {
    const actualString = stringify(actual)

    return {
      success: actual instanceof constructor,
      message: `expected ${actualString} to be an instance of ${constructor.name}`,
      negatedMessage: `expected ${actualString} not to be an instance of ` +
        `${constructor.name}, but it is`
    }
  }
}
