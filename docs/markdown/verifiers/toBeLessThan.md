### `.toBeLessThan(number)`

Use `.toBeLessThan` to check if a value is a number less than the argument.

If the value is not a number it will always fail, even if this verifier is negated with `.not`.

#### Examples

```javascript
expect(1).toBeLessThan(2)
expect(-2).toBeLessThan(-1)
expect(-Infinity).toBeLessThan(1)

expect(2).not.toBeLessThan(1)
expect(1).not.toBeLessThan(1)

// things that are not numbers always fail
expect('1').toBeLessThan(2) // AssertionError
expect('hello').not.toBeLessThan(1) // AssertionError
```
