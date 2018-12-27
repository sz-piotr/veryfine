import { hasOwnProperty } from './hasOwnProperty'

type StackItem = { value: any, result: any }

export function deepClone (value: any, stack: StackItem[] = []): any {
  const item = stack.find(item => item.value === value)
  if (item) {
    return item.result
  }

  if (Array.isArray(value)) {
    const result: any[] = []
    stack.push({ value, result })
    for (const element of value) {
      result.push(deepClone(element, stack))
    }
    stack.pop()
    return result
  }

  if (typeof value === 'object' && value) {
    const result: Record<string, any> = {}
    stack.push({ value, result })
    for (const prop in value) {
      if (hasOwnProperty(value, prop)) {
        result[prop] = deepClone(value[prop], stack)
      }
    }
    stack.pop()
    return result
  }

  return value
}
