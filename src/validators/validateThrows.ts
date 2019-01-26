import { stringify } from '../utils'

export function validateThrows (constructor?: unknown, message?: unknown) {
  if (constructor !== undefined && typeof constructor !== 'function') {
    throw new TypeError(
      'argument 0 of .toThrow must be an Error instance or an Error constructor'
    )
  }

  if (message !== undefined && (
    typeof message !== 'string' &&
    !(message instanceof RegExp)
  )) {
    throw new TypeError(
      'argument 1 of .toThrow must be a string or regular expression'
    )
  }

  if (constructor === undefined && message !== undefined) {
    throw new TypeError(
      'argument 0 of .toThrow must not be undefined if argument 1 is present'
    )
  }

  return function (actual: unknown) {
    const actualString = stringify(actual)
    const throwMessage = createThrowMessage(constructor as any, message as any)

    if (typeof actual !== 'function') {
      return {
        success: false,
        message: `expected ${actualString} to ${throwMessage}, ` +
          'but it is not a function',
        negatedMessage: ''
      }
    }

    try {
      actual()
      return {
        success: false,
        message: `expected ${actualString} to ${throwMessage}, ` +
          'but it did not throw anything',
        negatedMessage: ''
      }
    } catch (e) {
      return {
        success: validateThrowResult(e, constructor as any, message as any),
        message: `expected ${actualString} to ${throwMessage}, ` +
          `but instead it threw ${stringify(e)}`,
        negatedMessage: `expected ${actualString} not to ${throwMessage}, but it did`
      }
    }
  }
}

function createThrowMessage (constructor?: Function, message?: string | RegExp) {
  let throwMessage = 'throw'
  if (constructor !== undefined) {
    throwMessage += ` ${constructor.name}`
  }
  if (typeof message === 'string') {
    throwMessage += ` with a message of ${JSON.stringify(message)}`
  }
  if (message instanceof RegExp) {
    throwMessage += ` with a message matching ${message}`
  }
  return throwMessage
}

function validateThrowResult(
  e: unknown,
  constructor?: Function,
  message?: string | RegExp
) {
  if (constructor !== undefined) {
    if (e instanceof (constructor as Function)) {
      if (typeof message === 'string') {
        return !!e && (e as any).message === message
      }
      if (message instanceof RegExp) {
        return !!e && message.test((e as any).message)
      }
      return true
    }
    return false
  }
  return true
}
