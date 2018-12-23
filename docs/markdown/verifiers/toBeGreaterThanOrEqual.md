### `.toBeGreaterThanOrEqual(number)`

Use `.toBeGreaterThanOrEqual` to check if a value is a number greater than or equal to the argument.

If the value is not a number it will always fail, even if this verifier is negated with `.not`.

#### Examples

```javascript
import { expect } from 'veryfine'

expect(2).toBeGreaterThanOrEqual(1)
expect(-1).toBeGreaterThanOrEqual(-2)
expect(1).toBeGreaterThanOrEqual(1)
expect(Infinity).toBeGreaterThanOrEqual(1)

expect(1).not.toBeGreaterThanOrEqual(2)

// things that are not numbers always fail
expect('2').toBeGreaterThanOrEqual(1) // AssertionError
expect('hello').not.toBeGreaterThanOrEqual(1) // AssertionError
```
