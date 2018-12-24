### `.toBeLessThan(number)`

Use `.toBeLessThan` to check if a value is a number less than the argument.

If the value is not a number the check will always fail. This means that the
negated (`.not`) version will succeed for non-number values. For this reason,
it is recommended to use [`.toBeGreaterThanOrEqual`](#verifiers-tobegreaterthanorequal)
instead of using negation.

#### Examples

```javascript
import { expect } from 'veryfine'

expect(1).toBeLessThan(2)
expect(-2).toBeLessThan(-1)
expect(-Infinity).toBeLessThan(1)

// ANTIPATTERN, use .toBeGreaterThanOrEqual instead
expect(2).not.toBeLessThan(1)
expect(1).not.toBeLessThan(1)

// things that are not numbers always fail
expect('1').not.toBeLessThan(2)
expect('hello').not.toBeLessThan(1)
```
