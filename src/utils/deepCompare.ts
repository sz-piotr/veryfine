import { hasOwnProperty } from './hasOwnProperty'
import { isExpectation } from '../expectation'

export type Difference = {
  path: string,
  message: string
}

export function deepCompare (actual: any, expected: any) {
  const differences: Difference[] = []
  recursiveDeepCompare(actual, expected, differences)
  differences.sort(compareDifferences)
  return differences
}

export function recursiveDeepCompare (
  a: any,
  b: any,
  differences: Difference[],
  path = '',
  aStack: any[] = [],
  bStack: any[] = []
) {
  if (Object.is(a, b)) {
    return
  }

  const aIndex = aStack.indexOf(a)
  const bIndex = bStack.indexOf(b)
  if (aIndex >= 0 || bIndex >= 0) {
    if (aIndex !== bIndex) {
      differences.push({ path, message: 'circular reference mismatch' })
    }
    return
  }

  if (isExpectation(b)) {
    const result = b(a)
    if (result) {
      differences.push({ path, message: result })
    }
    return
  }

  const type = getType(a)
  if (type !== getType(b)) {
    differences.push({
      path,
      message: `expected type ${getType(b)}, received ${type}`
    })
    return
  }

  if (type === 'object') {
    aStack.push(a)
    bStack.push(b)
    const keys = keysOf(a, b)
    for (const key of keys) {
      const keyPath = joinPath(path, key)
      if (!hasOwnProperty(a, key)) {
        differences.push({ path: keyPath, message: `property missing` })
      } else if (!hasOwnProperty(b, key)) {
        differences.push({ path: keyPath, message: `property should not be present` })
      } else {
        recursiveDeepCompare(a[key], b[key], differences, keyPath, aStack, bStack)
      }
    }
    aStack.pop()
    bStack.pop()
    return
  }

  if (type === 'array') {
    if (a.length !== b.length) {
      differences.push({ path, message: `expected length ${b.length}, received ${a.length}` })
    }
    aStack.push(a)
    bStack.push(b)
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      if (i >= a.length) {
        differences.push({ path: joinPath(path, i), message: `item missing` })
      } else if (i >= b.length) {
        differences.push({ path: joinPath(path, i), message: `item should not be present` })
      } else {
        recursiveDeepCompare(a[i], b[i], differences, joinPath(path, i), aStack, bStack)
      }
    }
    aStack.pop()
    bStack.pop()
    return
  }

  differences.push({ path, message: `expected ${b}, received ${a}` })
}

function joinPath (path: string, key: string | number) {
  const strKey = key + ''
  if (/^[a-z_]\w*$/i.test(strKey)) {
    return `${path}.${strKey}`
  } else if (/^\d+$/.test(strKey)) {
    return `${path}[${strKey}]`
  } else {
    return `${path}[${JSON.stringify(strKey)}]`
  }
}

function getType (value: unknown) {
  if (Array.isArray(value)) {
    return 'array'
  } else if (value === null) {
    return 'null'
  } else if (value === undefined) {
    return 'undefined'
  } else {
    return typeof value
  }
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

function compareDifferences (a: Difference, b: Difference) {
  return lexCompare(a.path, b.path)
}

function lexCompare (a: string, b: string) {
  return (a < b ? -1 : (a > b ? 1 : 0))
}
