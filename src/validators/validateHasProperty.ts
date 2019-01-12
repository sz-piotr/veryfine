import { stringify, parsePath } from '../utils'

export function validateHasProperty (path: string, expected?: any) {
  if (typeof path !== 'string') {
    throw new TypeError('argument 0 of .toHaveProperty must be a string')
  }

  const expectedString = stringify(expected)
  const parsedPath = parsePath(path)
  const checkValue = arguments.length === 2

  return function (actual: any) {
    const actualString = stringify(actual)

    const { result, value } = hasProperty(actual, parsedPath)

    if (!result) {
      return {
        success: false,
        message: `expected ${actualString} to have property ${path}`,
        negatedMessage: ''
      }
    } else if (checkValue) {
      return {
        success: value === expected,
        message: `expected ${actualString} to have property ${path} ` +
          `equal to ${expectedString}`,
        negatedMessage: `expected ${actualString} not to have property ` +
          `${path} equal to ${expectedString}, but it does`
      }
    } else {
      return {
        success: true,
        message: '',
        negatedMessage: `expected ${actualString} not to have property ` +
          `${path}, but it does`
      }
    }
  }
}

function hasProperty (actual: any, parsedPath: string[]) {
  let current = actual
  for (const key of parsedPath) {
    try {
      if (current[key] !== undefined || key in current) {
        current = current[key]
      } else {
        return { result: false, value: undefined }
      }
    } catch {
      return { result: false, value: undefined }
    }
  }
  return { result: true, value: current }
}
