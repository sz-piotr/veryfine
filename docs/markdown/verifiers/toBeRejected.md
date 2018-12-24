### `.toBeRejected()`

Use `.toBeRejected` to check if a value is a `Promise` that is or will be rejected.

Because this check can only happen asynchronously this verifier returns
a `Promise`.

#### Examples

```javascript
import { expect } from 'veryfine'

async function () {
  // rejected promises satisfy the verifier
  await expect(Promise.reject()).toBeRejected()
  await expect(Promise.reject(new Error())).toBeRejected()

  // resolved promises and non-promise values always fail
  await expect(Promise.resolve()).not.toBeRejected()
  await expect(123).not.toBeRejected()
  await expect(new Error()).not.toBeRejected()
}
```
