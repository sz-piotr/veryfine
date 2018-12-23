### `.toStrictlyEqual(value)`

Use `.toStrictlyEqual` to check for strict (`===`) equality of values.
For primitives this behaves almost exactly like [`.toEqual`](#verifiers-toequal)
with differences listed below. When comparing objects however no deep equality
checks are performed.

#### Differences with primitives

  - for `NaN` and `NaN`: `.toStrictlyEqual` fails but `.toEqual` suceeds
  - for `+0` and `-0`: `.toStrictlyEqual` succeeds but `.toEqual` fails

#### Examples

```javascript
import { expect } from 'veryfine'

// toStrictlyEqual works for primitives, but so does toEqual
expect(1).toStrictlyEqual(1)

// for complex objects strict equality is required
const obj = { a: 1 }
expect(obj).toStrictlyEqual(obj)
expect(obj).not.toStrictlyEqual({ a: 1 })
```
