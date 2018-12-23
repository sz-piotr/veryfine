### `.toBeTruthy()`

Use `.toBeTruthy` to determine if a value evaluates to `true` in a boolean
context (`!!value === true`). In JavaScript all values are truthy unless they
are defined as falsy.

#### Examples

```javascript
import { expect } from 'veryfine'

expect(true).toBeTruthy()
expect({}).toBeTruthy()
expect([]).toBeTruthy()
expect(42).toBeTruthy()
expect('foo').toBeTruthy()
expect(new Date()).toBeTruthy()
expect(-42).toBeTruthy()
expect(3.14).toBeTruthy()
expect(-3.14).toBeTruthy()
expect(Infinity).toBeTruthy()
expect(-Infinity).toBeTruthy()

expect(false).not.toBeTruthy()
```
