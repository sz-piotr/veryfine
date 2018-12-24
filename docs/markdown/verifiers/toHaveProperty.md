### `.toHaveProperty(path[, value])`

Use `.toHaveProperty` to check if a value has the specified, possibly nested
propery.

Optionally you can provide the required property value. The property value must
strictly equal (`===`) the provided value to satisfy the validator.

#### Examples

```javascript
import { expect } from 'veryfine'

const object = {
  simple: 1,
  nested: {
    foo: 2,
    bar: undefined
  },
  array: [
    {
      deepDown: 'isn\'t it?'
    }
  ]
}

// the path provided will be parsed and the object searched
expect(object).toHaveProperty('simple')
expect(object).toHaveProperty('nested.foo')

// a property with a value of undefined still counts
expect(object).toHaveProperty('nested.bar')

// arrays can also be checked using the bracket syntax
expect(object).toHaveProperty('array[0].deepDown')

// optionally a value can be provided
expect(object).toHaveProperty('simple', 1)

// strict equality is required
expect(object).toHaveProperty('nested', object.nested)
expect(object).not.toHaveProperty('nested', {
  foo: 2,
  bar: undefined
})

// if a property is not found the verifier fails
expect(null).not.toHaveProperty('foo')
expect({}).not.toHaveProperty('foo')
```
