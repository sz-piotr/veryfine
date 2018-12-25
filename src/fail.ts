import { AssertionError } from './AssertionError'

export function fail (message: string): never
export function fail (message: string, expected: any, actual: any): never
export function fail (message: string, expected?: any, actual?: any) {
  throw new AssertionError(message, expected, actual)
}
