### `.toHaveProperty(path[, value])`

Use `.toHaveProperty` to check if a value has the specified, possibly nested
propery. The property must exist directly on the object or in its prototype chain.

Optionally you can provide the required property value. The property value must
strictly equal (`===`) the provided value to satisfy the validator.

#### Path syntax

Path syntax is very similar to normal javascript, but requires the use of double
quotes for non-standard property names. Double quotes and `\` inside property
names must be escaped using `\`. Valid paths include:

- `foo.bar`
- `[1].foo`
- `["12ab-+Bee"].name`
- `table[12][3]`
- `x.y["e\\scape\"d"]` - parses to: `x`, `y` and `e\scape"d`

#### Examples

```javascript
import { expect } from 'veryfine'

// the path provided will be parsed and the object searched
expect({ x: 1 }).toHaveProperty('x')
expect({ nested: { foo: 'bar' } }).toHaveProperty('nested.foo')

// a property with a value of undefined still counts
expect({ nested: { bar: undefined } }).toHaveProperty('nested.bar')

// arrays can also be checked using the bracket syntax
expect([{ x: 1 }]).toHaveProperty('[0].x')
expect({ array: [{ y: 2 }] }).toHaveProperty('array[0].y')

// non-standard property names require special syntax
expect({ 'b"ee': 3 }).toHaveProperty('["b\\"ee"]')

// optionally a value can be provided
expect({ x: 1 }).toHaveProperty('x', 1)
expect({ y: undefined }).toHaveProperty('y', undefined)

// strict equality is required
const object = { nested: {} }
expect(object).toHaveProperty('nested', object.nested)
expect(object).not.toHaveProperty('nested', {})

// prototypes are also checked
expect(1).toHaveProperty('toFixed', Number.prototype.toFixed)

// if a property is not found the verifier fails
expect(null).not.toHaveProperty('foo')
expect({}).not.toHaveProperty('foo')
```
