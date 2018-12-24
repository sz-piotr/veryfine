### `.toBeLessThanOrEqual(number)`

Use `.toBeLessThanOrEqual` to check if a value is a number less than or equal to the argument.

If the value is not a number the check will always fail. This means that the
negated (`.not`) version will succeed for non-number values. For this reason,
it is recommended to use [`.toBeGreaterThan`](#verifiers-tobegreaterthan)
instead of using negation.

#### Examples

```javascript
import { expect } from 'veryfine'

expect(1).toBeLessThanOrEqual(2)
expect(-2).toBeLessThanOrEqual(-1)
expect(1).toBeLessThanOrEqual(1)
expect(-Infinity).toBeLessThanOrEqual(1)

// ANTIPATTERN, use .toBeGreaterThan instead
expect(2).not.toBeLessThanOrEqual(1)

// things that are not numbers always fail
expect('1').not.toBeLessThanOrEqual(2)
expect('hello').not.toBeLessThanOrEqual(1)
```
