export const hasOwnProperty = (value: any, prop: string) =>
  !!value && Object.prototype.hasOwnProperty.call(value, prop)
