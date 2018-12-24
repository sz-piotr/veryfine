### `.toBeRejectedWith(error)`

Use `.toBeRejectedWith` to check if a value is a `Promise` that is or will be rejected
with a specific error.

If you provide an error constructor as an argument, the type of the thrown error
will be compared. If you provide an error instance as an argument the types will
be compared and deep equality will be checked (the `stack` property is omitted
when checking error deep equality).

Because this check can only happen asynchronously this verifier returns
a `Promise`.

#### Examples

```javascript
import { expect } from 'veryfine'

async function () {
  // passing error constructor facilitates a type check
  await expect(Promise.reject(new Error())).toBeRejectedWith(Error)
  await expect(Promise.reject(new Error())).not.toBeRejectedWith(TypeError)

  // passing error instances facilitates a deep comparison
  await expect(Promise.reject(new Error('hi')))
    .toBeRejectedWith(new Error('hi'))

  await expect(Promise.reject(new Error('foo')))
    .not.toBeRejectedWith(new Error('bar'))

  await expect(Promise.reject(new Error('abc')))
    .not.toBeRejectedWith(new TypeError('abc'))

  // resolved promises and non-promise values always fail
  await expect(Promise.resolve()).not.toBeRejectedWith(Error)
  await expect(123).not.toBeRejectedWith(Error)
  await expect(new Error()).not.toBeRejectedWith(Error)
}
```
