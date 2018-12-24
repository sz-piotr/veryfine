export function stringify(value: any): string {
  try {
    return JSON.stringify(value);
  } catch {
    return '[Unserializable]'
  }
}
