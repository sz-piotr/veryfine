### `.toBeGreaterThan(number)`

Use `.toBeGreaterThan` to check if a value is a number greater than the argument.

If the value is not a number it will always fail, even if this verifier is negated with `.not`.

#### Examples

```javascript
import { expect } from 'veryfine'

expect(2).toBeGreaterThan(1)
expect(-1).toBeGreaterThan(-2)
expect(Infinity).toBeGreaterThan(1)

expect(1).not.toBeGreaterThan(2)
expect(1).not.toBeGreaterThan(1)

// things that are not numbers always fail
expect('2').toBeGreaterThan(1) // AssertionError
expect('hello').not.toBeGreaterThan(1) // AssertionError
```
