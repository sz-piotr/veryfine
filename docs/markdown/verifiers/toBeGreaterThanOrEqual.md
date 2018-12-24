### `.toBeGreaterThanOrEqual(number)`

Use `.toBeGreaterThanOrEqual` to check if a value is a number greater than or equal to the argument.

If the value is not a number the check will always fail. This means that the
negated (`.not`) version will succeed for non-number values. For this reason,
it is recommended to use [`.toBeLessThan`](#verifiers-tobelessthan) instead of
using negation.

#### Examples

```javascript
import { expect } from 'veryfine'

expect(2).toBeGreaterThanOrEqual(1)
expect(-1).toBeGreaterThanOrEqual(-2)
expect(1).toBeGreaterThanOrEqual(1)
expect(Infinity).toBeGreaterThanOrEqual(1)

// ANTIPATTERN, use .toBeLessThan instead
expect(1).not.toBeGreaterThanOrEqual(2)

// things that are not numbers always fail
expect('2').not.toBeGreaterThanOrEqual(1)
expect('hello').not.toBeGreaterThanOrEqual(1)
```
