import { stringify } from '../utils/stringify'
import { hasOwnProperty } from '../utils/hasOwnProperty'
import { joinPath } from '../utils/path'

type Error = {
  path: string,
  message: string
}

export function validateEqual (expected: any) {
  return function (actual: any) {
    const expectedString = stringify(expected)
    const actualString = stringify(actual)

    const errors: Error[] = []
    const success = isDeepEqual(actual, expected, errors)
    errors.sort(errorCompare)

    let message = `expected ${actualString} to equal ${expectedString}`
    if (errors.length > 0) {
      message += '\n' + errors.map(formatError).join('\n')
    }

    return {
      success,
      message,
      negatedMessage: `expected ${actualString} not to equal ` +
        `${expectedString}, but it did`
    }
  }
}

function isDeepEqual (
  a: any,
  b: any,
  errors: Error[],
  path = '',
  aStack: any[] = [],
  bStack: any[] = []
): boolean {
  if (Object.is(a, b)) {
    return true
  }

  const aIndex = aStack.indexOf(a)
  const bIndex = bStack.indexOf(b)
  if (aIndex >= 0 || bIndex >= 0) {
    if (aIndex === bIndex) {
      return true
    } else {
      errors.push({ path, message: 'circular reference mismatch' })
      return false
    }
  }

  const type = getType(a)
  if (type !== getType(b)) {
    errors.push({
      path,
      message: `expected type ${getType(b)}, received ${type}`
    })
    return false
  }

  if (type === 'object') {
    aStack.push(a)
    bStack.push(b)
    const keys = keysOf(a, b)
    let result = true
    for (const key of keys) {
      if (!hasOwnProperty(a, key)) {
        errors.push({ path: joinPath(path, key), message: `property missing` })
        result = false
      } else if (!hasOwnProperty(b, key)) {
        errors.push({ path: joinPath(path, key), message: `property should not be present` })
        result = false
      } else if (!isDeepEqual(a[key], b[key], errors, joinPath(path, key), aStack, bStack)) {
        result = false
      }
    }
    aStack.pop()
    bStack.pop()
    return result
  }

  if (type === 'array') {
    if (a.length !== b.length) {
      errors.push({ path, message: `expected length ${b.length}, received ${a.length}` })
    }
    aStack.push(a)
    bStack.push(b)
    let result = true
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      if (i >= a.length) {
        errors.push({ path: joinPath(path, i), message: `item missing` })
        result = false
      } else if (i >= b.length) {
        errors.push({ path: joinPath(path, i), message: `item should not be present` })
        result = false
      } else if (!isDeepEqual(a[i], b[i], errors, joinPath(path, i), aStack, bStack)) {
        result = false
      }
    }
    aStack.pop()
    bStack.pop()
    return result
  }

  errors.push({ path, message: `expected ${b}, received ${a}` })
  return false
}

function getType (value: unknown) {
  if (Array.isArray(value)) {
    return 'array'
  }
  if (value === null) {
    return 'null'
  }
  if (value === undefined) {
    return 'undefined'
  }
  return typeof value
}

function keysOf (a: object, b: object) {
  const keys: string[] = []
  for (const key in a) {
    if (hasOwnProperty(a, key) && keys.indexOf(key) === -1) {
      keys.push(key)
    }
  }
  for (const key in b) {
    if (hasOwnProperty(b, key) && keys.indexOf(key) === -1) {
      keys.push(key)
    }
  }
  return keys
}

function formatError ({ path, message }: { path: string, message: string }) {
  if (path) {
    return `      - ${path} | ${message}`
  }
  return `      - ${message}`
}

function errorCompare (a: Error, b: Error) {
  return lexCompare(a.path, b.path)
}

function lexCompare (a: string, b: string) {
  return (a < b ? -1 : (a > b ? 1 : 0))
}
