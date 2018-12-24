### `.toMatch(regexp)`

Use `.toMatch` to check if a value is a string matching the provided reqular
expression.

#### Examples

```javascript
import { expect } from 'veryfine'

expect('foo').toMatch(/foo/)
expect('Hello World!').toMatch(/world/i)
expect('HEEEEEEY').toMatch(/^HE+Y$/)

// verifier fails if Regexp.test fails
expect('def').not.toMatch(/abc/)

// non-string values always fail
expect(null).not.toMatch(/abc/)
expect(123).not.toMatch(/123/)
```
