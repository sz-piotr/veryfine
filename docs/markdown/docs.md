## Introduction

Veryfine is a library built to make test driven development fun and easy. It is
intended to be used alongside [mocha](https://mochajs.org/) and provides a set
of tools that allow you to write assertions about your code.

### Main features

- [Powerful deep equality checking](#toequal)
- [Mock functions](#mock-functions)
- [Custom matchers](#tosatisfy)

### Core principles

- Simple, intuitive API
- Readable source code
- Extensible by default

## Matchers

Matchers are the bread and butter of the Verifine library. They allow you
to make assertions about your code and aid you in writing readable tests.

Using matchers is easy. Call the `expect` function with a value and then
call a method like [`.toEqual`](#toequal) on the result. If the check is not
successful an exception will be thrown. Sometimes it is useful to test that some
matcher fails for a value. To do so prefix your call to the matcher with `.not`.

Some matchers can also be used in an indirect form when checking deep equality.
Check out the [`.toEqual`](#toequal) matcher for more information.

If you ever encounter a situation where you would rather use a custom matcher
the [`.toSatisfy`](#tosatisfy) matcher will suit all your needs. It is extremely
powerful to the point where all the other matchers use it under the hood.

Below is a list of all the matchers:

- [`toEqual`](#toequal)
- [`toStrictlyEqual`](#tostrictlyequal)
- [`toBeTruthy`](#tobetruthy)
- [`toBeFalsy`](#tobefalsy)
- [`toHaveTypeOf`](#tohavetypeof)
- [`toBeInstanceOf`](#tobeinstanceof)
- [`toBeGreaterThan`](#tobegreaterthan)
- [`toBeGreaterThanOrEqual`](#tobegreaterthanorequal)
- [`toBeLessThan`](#tobelessthan)
- [`toBeLessThanOrEqual`](#tobelessthanorequal)
- [`toBeCloseTo`](#tobecloseto)
- [`toMatch`](#tomatch)
- [`toThrow`](#tothrow)
- [`toBeResolved`](#toberesolved)
- [`toBeRejected`](#toberejected)
- [`toBeRejectedWith`](#toberejectedwith)
- [`toBeCalled`](#tobecalled)
- [`toBeCalledTimes`](#tobecalledtimes)
- [`toBeCalledWith`](#tobecalledwith)
- [`toSatisfy`](#tosatisfy)

### toEqual

Use `.toEqual` to check for deep equality of values. Nested values can be
specified directly or described using an indirect matcher. Indirect matchers
are ones that don't specify a value to be checked:

- Direct matcher: `expect(true).toBeTruthy()`
- Indirect matcher: `expect.toBeTruthy()`

While `.toEqual` supports using indirect matchers it cannot be used as
an indirect matcher itself.

Two values are deeply equal if and only if one of the following is true:
  - They are strictly (`===`) equal
  - They are both NaN
  - They are objects and their members are deeply equal
  - They are arrays and their items are deeply equal
  - One is a matcher that performs a successful check on the other

To only check for strict equality (`===`) use
[`.toStrictlyEqual`](#tostrictlyequal). Note that for primitives like numbers,
strings and booleans it behaves the same as `.toEqual`.

```javascript
import { expect } from 'veryfine'

describe('toEqual', () => {
  it('compares objects recursively', () => {
    expect({
      a: 1,
      b: ['hello', { world: true }]
    }).toEqual({
      a: 1,
      b: ['hello', { world: true }]
    })
  })

  it('supports indirect matchers', () => {
    expect({ foo: 'hello', bar: [2, 1] }).toEqual({
      foo: expect.toHaveTypeOf('string'),
      bar: [
        2,
        expect.toBeGreaterThan(0)
      ]
    })
  })

  it('can be negated', () => {
    expect([1, 2]).not.toEqual([3, 4, 5])
  })
})
```

### toStrictlyEqual

Use `.toStrictlyEqual` to check for strict (`===`) equality of values. For
primitives this behaves like [`.toEqual`](#verifiers-toequal). When comparing
objects however referential equality is required.

```javascript
import { expect } from 'veryfine'

describe('toStrictlyEqual', () => {
  it('uses === to compare values', () => {
    expect(1).toStrictlyEqual(1)
    expect('foo').not.toStrictlyEqual('bar')
  })

  it('requires referential equality', () => {
    const a = { foo: 'bar' }
    const b = { foo: 'bar' }

    expect(a).toStrictlyEqual(a)
    expect(a).not.toStrictlyEqual(b)
  })

  it('can be used indirectly', () => {
    const obj = { x: 1, y: 2 }
    expect({ foo: obj }).toEqual({
      foo: expect.toStrictlyEqual(obj)
    })
  })
})
```

### toBeTruthy

Use `.toBeTruthy` to determine if a value evaluates to `true` in a boolean
context (`!!value === true`). In JavaScript all values are truthy unless they
are defined as falsy.

```javascript
import { expect } from 'veryfine'

describe('toBeTruthy', () => {
  it('checks if values are truthy', () => {
    expect(1).toBeTruthy()
    expect(null).not.toBeTruthy()
  })

  it('can be used indirectly', () => {
    expect({ foo: true }).toEqual({
      foo: expect.toBeTruthy()
    })
  })
})
```

### toBeFalsy

Use `.toBeFalsy` to determine if a value evaluates to `false` in a boolean
context (`!!value === false`).

```javascript
import { expect } from 'veryfine'

describe('toBeFalsy', () => {
  it('checks if values are falsy', () => {
    expect(0).toBeFalsy()
    expect('hello').not.toBeFalsy()
  })

  it('can be used indirectly', () => {
    expect({ foo: false }).toEqual({
      foo: expect.toBeFalsy()
    })
  })
})
```

### toHaveTypeOf

Use `.toHaveTypeOf` to perform a check using the
[`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
operator.

```javascript
import { expect } from 'veryfine'

describe('toHaveTypeOf', () => {
  it('checks if values have a specific type', () => {
    expect(0).toHaveTypeOf('number')
    expect(true).toHaveTypeOf('boolean')
    expect([]).not.toHaveTypeOf('string')
  })

  it('can be used indirectly', () => {
    expect({ foo: 'bar' }).toEqual({
      foo: expect.toHaveTypeOf('string')
    })
  })
})
```

### toBeInstanceOf

Use `.toBeInstanceOf` to perform a check using the
[`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
operator.

```javascript
import { expect } from 'veryfine'

class Foo {}
class Bar extends Foo {}

describe('toBeInstanceOf', () => {
  it('checks if values are instances of a specific class', () => {
    expect(new Bar()).toBeInstanceOf(Foo)
    expect({ x: 1 }).not.toBeInstanceOf(Bar)
  })

  it('can be used indirectly', () => {
    expect({ foo: [] }).toEqual({
      foo: expect.toBeInstanceOf(Array)
    })
  })
})
```

### toBeGreaterThan

Use `.toBeGreaterThan` to check if a value is a number greater than the argument.

If the value is not a number the check will always fail. This means that the
negated (`.not`) version will succeed for non-number values. For this reson,
it is recommended to use [`.toBeLessThanOrEqual`](#tobelessthanorequal)
instead of using negation.

```javascript
import { expect } from 'veryfine'

describe('toBeGreaterThan', () => {
  it('checks if a value is greater than expected', () => {
    expect(2).toBeGreaterThan(1)
    expect(-Infinity).not.toBeGreaterThan(1)
    expect('hello').not.toBeGreaterThan(1)
  })

  it('can be used indirectly', () => {
    expect({ foo: 3 }).toEqual({
      foo: expect.toBeGreaterThan(0)
    })
  })
})
```

### toBeGreaterThanOrEqual

Use `.toBeGreaterThanOrEqual` to check if a value is a number greater than or
equal to the argument.

If the value is not a number the check will always fail. This means that the
negated (`.not`) version will succeed for non-number values. For this reason,
it is recommended to use [`.toBeLessThan`](#tobelessthan) instead of
using negation.

```javascript
import { expect } from 'veryfine'

describe('toBeGreaterThanOrEqual', () => {
  it('checks if a value is greater than or equal to expected', () => {
    expect(2).toBeGreaterThanOrEqual(1)
    expect(1).toBeGreaterThanOrEqual(1)
    expect('hello').not.toBeGreaterThanOrEqual(1)
  })

  it('can be used indirectly', () => {
    expect({ foo: 3 }).toEqual({
      foo: expect.toBeGreaterThanOrEqual(3)
    })
  })
})
```

### toBeLessThan

Use `.toBeLessThan` to check if a value is a number less than the argument.

If the value is not a number the check will always fail. This means that the
negated (`.not`) version will succeed for non-number values. For this reason,
it is recommended to use [`.toBeGreaterThanOrEqual`](#tobegreaterthanorequal)
instead of using negation.

```javascript
import { expect } from 'veryfine'

describe('toBeLessThan', () => {
  it('checks if a value is less than expected', () => {
    expect(0).toBeLessThan(1)
    expect(Infinity).not.toBeLessThan(1)
    expect('hello').not.toBeLessThan(1)
  })

  it('can be used indirectly', () => {
    expect({ foo: 0 }).toEqual({
      foo: expect.toBeLessThan(3)
    })
  })
})
```

### toBeLessThanOrEqual

Use `.toBeLessThanOrEqual` to check if a value is a number less than or equal to the argument.

If the value is not a number the check will always fail. This means that the
negated (`.not`) version will succeed for non-number values. For this reason,
it is recommended to use [`.toBeGreaterThan`](#tobegreaterthan)
instead of using negation.

```javascript
import { expect } from 'veryfine'

describe('toBeLessThanOrEqual', () => {
  it('checks if a value is less than or equal to expected', () => {
    expect(0).toBeLessThanOrEqual(1)
    expect(1).toBeLessThanOrEqual(1)
    expect('hello').not.toBeLessThanOrEqual(1)
  })

  it('can be used indirectly', () => {
    expect({ foo: 3 }).toEqual({
      foo: expect.toBeLessThanOrEqual(3)
    })
  })
})
```

### toBeCloseTo

Use `.toBeCloseTo` to compare floating point numbers. Because floating
arithmetic can result in tiny errors one shouldn't always compare
them directly (e.g. `0.1 + 0.2 !== 0.3`).

Additionaly precision might be supplied as a second argument.

If the value is not a number the check will always fail. This means that the
negated (`.not`) version will succeed for non-number values.

```javascript
import { expect } from 'veryfine'

describe('toBeCloseTo', () => {
  it('checks if a value is close to to expected', () => {
    expect(1).toBeCloseTo(1)
    expect(0.1 + 0.2).toBeCloseTo(0.3)
    expect(0.1 + 0.2).not.toBeCloseTo(0.4)
    expect('hello').not.toBeCloseTo(1)
  })

  it('can specify a desired precision', () => {
    expect(0.150 + 0.049).toBeCloseTo(0.2, 0.01)
  })

  it('can be used indirectly', () => {
    expect({ foo: 0.1 + 0.2 }).toEqual({
      foo: expect.toBeCloseTo(0.3)
    })
  })
})
```

### toMatch

Use `.toMatch` to check if a value is a string matching the provided reqular
expression.

If the value is not a string the check will always fail. This means that the
negated (`.not`) version will succeed for non-string values.

#### Examples

```javascript
import { expect } from 'veryfine'

describe('toMatch', () => {
  it('checks values against regular expressions', () => {
    expect('foo').toMatch(/foo/)
    expect('HEEEEEEY').toMatch(/^he+y$/i)
    expect('def').not.toMatch(/abc/)
    expect(null).not.toMatch(/abc/)
  })

  it('can be used indirectly', () => {
    expect({ foo: 'xxx' }).toEqual({
      foo: expect.toMatch(/^x+$/)
    })
  })
})
```

### toThrow

Use `.toThrow` to check if a value is a function that will throw when called.

If you provide an error constructor as an argument, the type of the thrown error
will be compared. If you provide a string as a second argument the error message
will be compared to that string. If you provide a regex as a second argument
the error message will be tested against it.

```javascript
import { expect } from 'veryfine'

describe('toThrow', () => {
  it('checks if a callback throws an error', () => {
    expect(() => { throw new Error() }).toThrow()
    expect(() => {}).not.toThrow()
    expect(null).not.toThrow()
  })

  it('can optionally specify something about the error', () => {
    expect(() => { throw new TypeError() }).toThrow(TypeError)
    expect(() => { throw new TypeError('hi') }).toThrow(TypeError, 'hi')
    expect(() => { throw new TypeError('xxx') }).toThrow(TypeError, /^x+$/)
  })
})
```

### toBeResolved

Use `.toBeResolved` to check if a value is a `Promise` that is or will be resolved.

Because this check can only happen asynchronously this verifier returns
a `Promise`.

```javascript
import { expect } from 'veryfine'

describe('toBeResolved', () => {
  it('checks if a promise is or will be resolved', async () => {
    await expect(Promise.resolve()).toBeResolved()
    await expect(Promise.reject()).not.toBeResolved()
    await expect(42).not.toBeResolved()
  })
})
```

### toBeRejected

Use `.toBeRejected` to check if a value is a `Promise` that is or will be rejected.

Because this check can only happen asynchronously this verifier returns
a `Promise`.

```javascript
import { expect } from 'veryfine'

describe('toBeRejected', () => {
  it('checks if a promise is or will be rejected', async () => {
    await expect(Promise.reject()).toBeRejected()
    await expect(Promise.resolve()).not.toBeRejected()
    await expect(42).not.toBeRejected()
  })
})
```

### toBeRejectedWith

Use `.toBeRejectedWith` to check if a value is a `Promise` that is or will
be rejected with a specific error.

If you provide an error constructor as an argument, the type of the thrown error
will be compared. If you provide an error instance as an argument the types will
be compared and deep equality will be checked (the `stack` property is omitted
when checking error deep equality).

Because this check can only happen asynchronously this verifier returns
a `Promise`.

```javascript
import { expect } from 'veryfine'

describe('toBeRejectedWith', () => {
  it('checks if a promise is or will be rejected with an error', async () => {
    await expect(Promise.reject(new TypeError()))
        .toBeRejectedWith(TypeError)

    await expect(Promise.reject(new TypeError('hi')))
        .toBeRejectedWith(new TypeError('hi'))

    await expect(Promise.reject(3)).not.toBeRejectedWith(Error)
    await expect(42).not.toBeRejectedWith(Error)
  })
})
```

### toBeCalled

Use `.toBeCalled` to check if a [mock function](#mocks) was called at least once.

```javascript
import { expect, mockFn } from 'veryfine'

describe('toBeCalled', () => {
  it('checks if a mockFn was called at least once', () => {
    const fn = mockFn()

    expect(fn).not.toBeCalled()

    fn()
    expect(fn).toBeCalled()
  })

  it('always fails for non-mocks', () => {
    expect(123).not.toBeCalled()
    expect(function () {}).not.toBeCalled()
  })
})
```

### toBeCalledTimes

Use `.toBeCalledTimes` to check if a [mock function](#mocks) was called a specific
number of times.

```javascript
import { expect, mockFn } from 'veryfine'

describe('toBeCalledTimes', () => {
  it('checks if a mockFn was called a specific number of times', () => {
    const fn = mockFn()

    expect(fn).toBeCalledTimes(0)

    fn()
    expect(fn).toBeCalledTimes(1)

    fn()
    expect(fn).toBeCalledTimes(2)
    expect(fn).not.toBeCalledTimes(1)
  })

  it('always fails for non-mocks', () => {
    expect(123).not.toBeCalledTimes(1)
    expect(function () {}).not.toBeCalledTimes(2)
  })
})
```

### toBeCalledWith

Use `.toBeCalledWith` to check if a [mock function](#mocks) was most recently
called with the specified arguments in the most recent call. Arguments are
compared using [`.toEqual`](#toequal).

```javascript
import { expect, mockFn } from 'veryfine'

describe('toBeCalledTimes', () => {
  it('checks if a mockFn was called a specific number of times', () => {
    const fn = mockFn()

    expect(fn).toBeCalledTimes(0)

    fn()
    expect(fn).toBeCalledTimes(1)

    fn()
    expect(fn).toBeCalledTimes(2)
    expect(fn).not.toBeCalledTimes(1)
  })

  it('always fails for non-mocks', () => {
    expect(123).not.toBeCalledTimes(1)
    expect(function () {}).not.toBeCalledTimes(2)
  })
})
```

### toSatisfy

Docs in the making

## Mock functions

Docs in the making
