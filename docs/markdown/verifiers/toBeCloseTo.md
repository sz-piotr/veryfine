### `.toBeCloseTo(number[, precision])`

Use `.toBeCloseTo` to compare floating point numbers. Because floating
arithmetic can result in tiny errors one shouldn't always compare
them directly (`0.1 + 0.2 !== 0.3`).

Additionaly precision might be supplied as a second argument.

If the value is not a number the check will always fail, even if this verifier is
negated with [`.not`](#modifiers-not).

#### Examples

```javascript
import { expect } from 'veryfine'

expect(0.1 + 0.2).toBeCloseTo(0.3)
expect(0.1 + 0.2).not.toBeCloseTo(0.4)

expect(0.150 + 0.049).not.toBeCloseTo(0.2)
// you can specify a desired precision
expect(0.150 + 0.049).toBeCloseTo(0.2, 0.01)

// things that are not numbers always fail
expect('2').toBeCloseTo(2) // AssertionError
expect('hello').not.toBeCloseTo(2) // AssertionError
```
