### `.toBeResolved()`

Use `.toBeResolved` to check if a value is a `Promise` that is or will be resolved.

Because this check can only happen asynchronously this verifier returns
a `Promise`.

#### Examples

```javascript
import { expect } from 'veryfine'

async function () {
  // resolved promises satisfy the verifier
  await expect(Promise.resolve()).toBeResolved()
  await expect(Promise.resolve('hello')).toBeResolved()

  // to make assertions about the resolved value use await
  const value = await Promise.resolve(123);
  expect(value).toEqual(123);

  // rejected promises and non-promise values always fail
  await expect(Promise.reject()).not.toBeResolved()
  await expect(123).not.toBeResolved()
  await expect(new Error()).not.toBeResolved()
}
```
