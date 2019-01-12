export function stringify (value: unknown, stack: any[] = []): string {
  if (value === null) {
    return 'null'
  }

  if (stack.indexOf(value) !== -1) {
    return '<Circular>'
  }

  stack.push(value)
  try {
    switch (typeof value) {
      case 'number':
        if (Object.is(value, -0)) {
          return '-0'
        }
        return value.toString()
      case 'bigint': // NOTE: no automatic tests!
        return value.toString() + 'n'
      case 'boolean':
      case 'symbol':
        return value.toString()
      case 'undefined':
        return 'undefined'
      case 'string':
        return JSON.stringify(value)
      case 'function':
        return stringifyFunction(value)
      case 'object':
        return stringifyObject(value!, stack)
      default:
        return '[Unserializable]'
    }
  } finally {
    stack.pop()
  }
}

function stringifyFunction (fn: Function): string {
  if (fn.name) {
    return `Function(${fn.name})`
  }
  return `Function`
}

function stringifyObject (value: object, stack: any[]): string {
  if (Array.isArray(value)) {
    return stringifyArray(value, stack)
  }

  if (value instanceof Error) {
    const constructor = value.constructor.name || value.name
    if (value.message) {
      return `${constructor}(${JSON.stringify(value.message)})`
    }
    return constructor
  }

  if (value instanceof String) {
    return `String(${JSON.stringify(value)})`
  }

  if (value instanceof Number) {
    return `Number(${value})`
  }

  if (value instanceof Boolean) {
    return `Boolean(${value})`
  }

  if (value instanceof Date) {
    return `Date(${value.toISOString()})`
  }

  const prototype = Object.getPrototypeOf(value)
  if (prototype === null) {
    return stringifyNullProtoObject(value, stack)
  }
  if (
    prototype === Object.prototype ||
    prototype === null ||
    !prototype.constructor ||
    !prototype.constructor.name
  ) {
    return stringifyPlainObject(value, stack)
  }
  return `${prototype.constructor.name} ${stringifyPlainObject(value, stack)}`
}

function stringifyArray (array: any[], stack: any[]): string {
  return `[${array.map(x => stringify(x, stack)).join(', ')}]`
}

function stringifyNullProtoObject (object: object, stack: any[]): string {
  const members = stringifyMembers(object, stack)
  if (members) {
    return `{ (null prototype) ${members} }`
  }
  return '{ (null prototype) }'
}

function stringifyPlainObject (object: object, stack: any[]): string {
  const members = stringifyMembers(object, stack)
  if (members) {
    return `{ ${members} }`
  }
  return '{}'
}

function stringifyMembers (object: Record<string, any>, stack: any[]): string {
  return Object.keys(object)
    .sort()
    .map(key => `${key}: ${stringify(object[key], stack)}`)
    .join(', ')
}
