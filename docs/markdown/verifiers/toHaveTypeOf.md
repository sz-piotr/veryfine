### `.toHaveTypeOf(string)`

Use `.toHaveTypeOf` to perform a check using the [`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator.

#### Examples

```javascript
import { expect } from 'veryfine'

expect(123).toHaveTypeOf('number')
expect('hi').toHaveTypeOf('string')
expect(true).toHaveTypeOf('boolean')
expect(undefined).toHaveTypeOf('undefined')
expect({ a: 1 }).toHaveTypeOf('object')
expect(null).toHaveTypeOf('object') // GOTCHA!
expect(function fn() {}).toHaveTypeOf('function')
expect(Symbol()).toHaveTypeOf('symbol')
```
