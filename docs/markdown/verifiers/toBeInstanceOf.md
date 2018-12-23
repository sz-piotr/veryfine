### `.toBeInstanceOf(class)`

Use `.toBeInstanceOf` to perform a check using the [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) operator. Keep in mind that `instanceof` does not work for primitives.

#### Examples

```javascript
import { expect } from 'veryfine'

class Foo {}
class Bar {}
class FooBar extends Foo {}

// instanceof supports classes
expect(new Foo()).toBeInstanceOf(Foo)
expect(new Bar()).not.toBeInstanceOf(Foo)

// traversing the prototype chain also works
expect(new FooBar()).toBeInstanceOf(Foo)
expect(new Bar()).toBeInstanceOf(Object)

// most objects are instances of Object
expect({ a: 1 }).toBeInstanceOf(Object)
expect(Object.create(null)).not.toBeInstanceOf(Object)

// arrays are both Arrays and Objects
expect([1, 2]).toBeInstanceOf(Array)
expect([3, 4]).toBeInstanceOf(Object)

// functions are both Functions and Objects
expect(() => {}).toBeInstanceOf(Function)
expect(function fn() {}).toBeInstanceOf(Object)

// does not work for primitives!
expect(1).not.toBeInstanceOf(Number)
expect('hi').not.toBeInstanceOf(String)
expect(true).not.toBeInstanceOf(Boolean)
```
