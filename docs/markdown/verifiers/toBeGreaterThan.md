### `.toBeGreaterThan(number)`

Use `.toBeGreaterThan` to check if a value is a number greater than the argument.

If the value is not a number the check will always fail. This means that the
negated (`.not`) version will succeed for non-number values. For this reson,
it is recommended to use [`.toBeLessThanOrEqual`](#verifiers-tobelessthanorequal)
instead of using negation.

#### Examples

```javascript
import { expect } from 'veryfine'

expect(2).toBeGreaterThan(1)
expect(-1).toBeGreaterThan(-2)
expect(Infinity).toBeGreaterThan(1)

// ANTIPATTERN, use .toBeLessThanOrEqual instead
expect(1).not.toBeGreaterThan(2)
expect(1).not.toBeGreaterThan(1)

// things that are not numbers always fail
expect('2').not.toBeGreaterThan(1)
expect('hello').not.toBeGreaterThan(1)
```
