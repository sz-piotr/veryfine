### `.toBeLessThanOrEqual(number)`

Use `.toBeLessThanOrEqual` to check if a value is a number less than or equal to the argument.

If the value is not a number it will always fail, even if this verifier is negated with `.not`.

#### Examples

```javascript
import { expect } from 'veryfine'

expect(1).toBeLessThanOrEqual(2)
expect(-2).toBeLessThanOrEqual(-1)
expect(1).toBeLessThanOrEqual(1)
expect(-Infinity).toBeLessThanOrEqual(1)

expect(2).not.toBeLessThanOrEqual(1)

// things that are not numbers always fail
expect('1').toBeLessThanOrEqual(2) // AssertionError
expect('hello').not.toBeLessThanOrEqual(1) // AssertionError
```
