### `.toMatchObject(object)`

Use `.toMatchObject` to check for deep equality of values. It is very similar
to [`.toEqual`](#verifiers-toequal) with one difference: The checked value can
have more properties than are specified in the verifier.

#### Examples

```javascript
import { expect } from 'veryfine'

// the tested value can have additional properties
expect({ x: 1, y: 2 }).toMatchObject({ x: 1 })

// nesting is supported
expect({ foo: { a: 'A', b: 'B' }}).toMatchObject({ foo: { b: 'B' } })

// you can also use expectations
expect({ x: 1, y: 2 }).toMatchObject({ x: expect.type('number') })

// the verifier fails when some properties do not match
expect({}).not.toMathObject({ x: 1 })

// non-object values always fail
expect('def').not.toMatchObject({})
expect(null).not.toMatchObject({})
expect(123).not.toMatchObject({})
```
