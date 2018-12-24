### `.toThrow([error])`

Use `.toThrow` to check if a value is a function that will throw when called.

If you provide an error constructor as an argument, the type of the thrown error
will be compared. If you provide an error instance as an argument the types will
be compared and deep equality will be checked (the `stack` property is omitted
when checking error deep equality).

#### Examples

```javascript
import { expect } from 'veryfine'

// the provided function will be called and the error caught
await expect(() => { throw new Error() }).toThrow()

// passing error constructor facilitates a type check
await expect(() => { throw new Error() }).toThrow(Error)
await expect(() => { throw new Error() }).not.toThrow(TypeError)

// passing error instances facilitates a deep comparison
await expect(() => { throw new Error('hi') })
  .toThrow(new Error('hi'))

await expect(() => { throw new Error('foo') })
  .not.toThrow(new Error('bar'))

await expect(() => { throw new Error('abc') })
  .not.toThrow(new TypeError('abc'))

// functions that do not throw and non-function values always fail
await expect(() => 1).not.toThrow()
await expect(123).not.toThrow()
await expect(new Error()).not.toThrow(Error)
```
