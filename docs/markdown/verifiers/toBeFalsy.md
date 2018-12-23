### `.toBeFalsy()`

Use `.toBeFalsy` to determine if a value evaluates to `false` in a
boolean context (`!!value === false`).

#### Examples

```javascript
import { expect } from 'veryfine'

expect(false).toBeFalsy()
expect(null).toBeFalsy()
expect(undefined).toBeFalsy()
expect(0).toBeFalsy()
expect(NaN).toBeFalsy()
expect('').toBeFalsy()
expect("").toBeFalsy()
expect(``).toBeFalsy()

expect(true).not.toBeFalsy()
```
