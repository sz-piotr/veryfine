## Verifiers

### `.toEqual(value)`

Use `toEqual` to check for deep equality of values. Additionally `toEqual`
supports using [expectations](#expectations). To check for strict equality (`===`) use `.toStrictlyEqual`.

#### Deep equality rules

Two values are deeply equal if and only if one of the following is true:
  - [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) returns true when comparing them
  - They are arrays of the same length and their items are deeply equal
  - They are sets and their items are strictly equal
  - They are maps and their keys are stricly equal and values are deeply equal
  - They are objects and their properties are deeply equal
  - One is an [expectation](#expectations) that the other satisfies

#### Examples

```javascript
// toEqual works great for primitives
expect(true).toEqual(true);
expect(123).toEqual(123);
expect('hello').not.toEqual('world');

// array length and items are compared
expect([1, 2]).toEqual([1, 2]);
expect([1, 2]).not.toEqual([1, 2, 3]);
expect([1, 2]).not.toEqual([3, 4]);

// property values are checked when evaluating objects
expect({ x: 1 }).toEqual({ x: 1 });
expect({ x: 1, y: 2 }).not.toEqual({ x: 1 });

// expectations can be used in place of any value
expect({ message: 'I love you!' }).toEqual({
  message: expect.type('string')
});
expect([1, 'hello']).toEqual([1, expect.anything()]);

// deep equality checking is recursive
expect({
  nested: { x: 1, y: 2 },
  array: [
    { name: 'John', id: 'AA-123' },
    { name: 'Suzan', id: 'AB-456' }
  ]
}).toEqual({
  nested: expect.toHaveProperty('x', 1),
  array: [
    { name: 'John', id: 'AA-123' },
    { name: 'Suzan', id: expect.toMatch(/\w{2}-\d{3}/) }
  ]
});

// Set items must be strictly equal!
expect(new Set([1, 2])).toEqual(new Set([2, 1]));
expect(new Set([1])).not.toEqual(new Set([expect.type('number')]));

// Map keys must be strictly equal but values deeply equal
const key1 = { a: 1 };
const key2 = { a: 1 };
const value1 = { b: 2 };
const value2 = { b: 2 };
expect(new Map([[key1, value1]])).toEqual(new Map([[key1, value2]]));
expect(new Map([[key1, value1]])).not.toEqual(new Map([[key2, value1]]));
```

### `.toStrictlyEqual(value)`

Use `.toStrictlyEqual` to check for strict (`===`) equality of values. For primitives this behaves almost exactly like `.toEqual` with differences listed below. When comparing objects however no deep equality checks are performed.

#### Differences with primitives

  - for `NaN` and `NaN`: `.toStrictlyEqual` fails but `.toEqual` suceeds
  - for `+0` and `-0`: `.toStrictlyEqual` succeeds but `.toEqual` fails

#### Examples

```javascript
// toStrictlyEqual works for primitives, but so does toEqual
expect(1).toStrictlyEqual(1);

// for complex objects strict equality is required
const obj = { a: 1 };
expect(obj).toStrictlyEqual(obj);
expect(obj).not.toStrictlyEqual({ a: 1 });
```

### `.toBeInstanceOf(class)`

Use `.toBeInstanceOf` to perform a check using the [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) operator. Keep in mind that `instanceof` does not work for primitives.

#### Examples

```javascript
class Foo {}
class Bar {}
class FooBar extends Foo {}

// instanceof supports classes
expect(new Foo()).toBeInstanceOf(Foo);
expect(new Bar()).not.toBeInstanceOf(Foo);

// traversing the prototype chain also works
expect(new FooBar()).toBeInstanceOf(Foo);
expect(new Bar()).toBeInstanceOf(Object);

// most objects are instances of Object
expect({ a: 1 }).toBeInstanceOf(Object);
expect(Object.create(null)).not.toBeInstanceOf(Object);

// arrays are both Arrays and Objects
expect([1, 2]).toBeInstanceOf(Array);
expect([3, 4]).toBeInstanceOf(Object);

// functions are both Functions and Objects
expect(() => {}).toBeInstanceOf(Function);
expect(function fn() {}).toBeInstanceOf(Object);

// does not work for primitives!
expect(1).not.toBeInstanceOf(Number);
expect('hi').not.toBeInstanceOf(String);
expect(true).not.toBeInstanceOf(Boolean);
```

### `.toHaveTypeOf(string)`

Use `.toHaveTypeOf` to perform a check using the [`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator.

#### Examples

```javascript
expect(123).toHaveTypeOf('number');
expect('hi').toHaveTypeOf('string');
expect(true).toHaveTypeOf('boolean');
expect(undefined).toHaveTypeOf('undefined');
expect({ a: 1 }).toHaveTypeOf('object');
expect(null).toHaveTypeOf('object'); // GOTCHA!
expect(function fn() {}).toHaveTypeOf('function');
expect(Symbol()).toHaveTypeOf('symbol');
```

### `.toBeTruthy()`

Use `.toBeTruthy` to determine if a value evaluates to `true` in a boolean context (`!!value === true`). In JavaScript all values are truthy unless they are defined as falsy.

#### Examples

```javascript
expect(true).toBeTruthy()
expect({}).toBeTruthy()
expect([]).toBeTruthy()
expect(42).toBeTruthy()
expect('foo').toBeTruthy()
expect(new Date()).toBeTruthy()
expect(-42).toBeTruthy()
expect(3.14).toBeTruthy()
expect(-3.14).toBeTruthy()
expect(Infinity).toBeTruthy()
expect(-Infinity).toBeTruthy()

expect(false).not.toBeTruthy()
```

### `.toBeFalsy()`

Use `.toBeFalsy` to determine if a value evaluates to `false` in a boolean context (`!!value === false`).

#### Examples

```javascript
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

### `.toBeGreaterThan(number)`

Use `.toBeGreaterThan` to check if a value is a number greater than the argument.

#### Examples

```javascript
expect(2).toBeGreaterThan(1)
expect(-1).toBeGreaterThan(-2)
expect(Infinity).toBeGreaterThan(1)

expect(1).not.toBeGreaterThan(2)
expect(1).not.toBeGreaterThan(1)
// things that are not numbers always fail
expect('2').not.toBeGreaterThan(1)
expect('hello').not.toBeGreaterThan(1)
```

### `.toBeGreaterThanOrEqualTo(number)`

Use `.toBeGreaterThanOrEqualTo` to check if a value is a number greater than or equal to the argument.

#### Examples

```javascript
expect(2).toBeGreaterThanOrEqualTo(1)
expect(-1).toBeGreaterThanOrEqualTo(-2)
expect(1).toBeGreaterThanOrEqualTo(1)
expect(Infinity).toBeGreaterThanOrEqualTo(1)

expect(1).not.toBeGreaterThanOrEqualTo(2)
// things that are not numbers always fail
expect('2').not.toBeGreaterThanOrEqualTo(1)
expect('hello').not.toBeGreaterThanOrEqualTo(1)
```

### `.toBeLessThan(number)`

Use `.toBeLessThan` to check if a value is a number less than the argument.

#### Examples

```javascript
expect(1).toBeLessThan(2)
expect(-2).toBeLessThan(-1)
expect(-Infinity).toBeLessThan(1)

expect(2).not.toBeLessThan(1)
expect(1).not.toBeLessThan(1)
// things that are not numbers always fail
expect('1').not.toBeLessThan(2)
expect('hello').not.toBeLessThan(1)
```

### `.toBeLessThanOrEqualTo(number)`

Use `.toBeLessThanOrEqualTo` to check if a value is a number less than or equal to the argument.

#### Examples

```javascript
expect(1).toBeLessThanOrEqualTo(2)
expect(-2).toBeLessThanOrEqualTo(-1)
expect(1).toBeLessThanOrEqualTo(1)
expect(-Infinity).toBeLessThanOrEqualTo(1)

expect(2).not.toBeLessThanOrEqualTo(1)
// things that are not numbers always fail
expect('1').not.toBeLessThanOrEqualTo(2)
expect('hello').not.toBeLessThanOrEqualTo(1)
```

### `.toBeCloseTo(number[, precision])`

Use `.toBeCloseTo` to compare floating point numbers. Because floating arithmetic can result in tiny errors one shouldn't always compare them directly (`0.1 + 0.2 !== 0.3`).

Additionaly precision might be supplied as a second argument.

#### Examples

```javascript
expect(0.1 + 0.2).toBeCloseTo(0.3);
expect(0.1 + 0.2).not.toBeCloseTo(0.4);

expect(0.150 + 0.049).not.toBeCloseTo(0.2);
// you can specify a desired precision
expect(0.150 + 0.049).toBeCloseTo(0.2, 0.01);
```

### `.toHaveProperty(path[, value])`
### `.toMatch(regexp)`
### `.toMatchObject(object)`
### `.toThrow([error])`
### `.toBeResolved()`
### `.toBeRejected()`
### `.toBeRejectedWith(error)`
### `.toSatisfy(fn[, message])`

## Modifiers

### `.not`
### `.resolved`

## Expectations

Expectations are special purpose functions that can be used alongside `.toEqual` when checking object deep equality. Sometimes you don't want specify directly a value that you check. Expectations allow you to say something about the value without necessarily specifying the value itself.

All expectations can be combined with the `.not` modifier.

### `expect.anything()`

Use `expect.anything()` when you expect a value to be present.

#### Examples

```javascript
// any value including undefined works
expect({ x: 1 }).toEqual({ x: expect.anything() });
expect({ x: undefined }).toEqual({ x: expect.anything() });

// missing values are not satisfactory
expect({}).not.toEqual({ x: expect.anything() });
expect([]).not.toEqual([expect.anything()]);

// can be negated
expect({}).toEqual({ x: expect.not.anything() });
```

### `expect.strictlyEqual(value)`
### `expect.instanceOf(Class)`
### `expect.type(type)`
### `expect.truthy()`
### `expect.falsy()`
### `expect.greaterThan(number)`
### `expect.greaterThanOrEqualTo(number)`
### `expect.lessThan(number)`
### `expect.lessThanOrEqualTo(number)`
### `expect.closeTo(number[, precision])`
### `expect.hasProperty(path[, value])`
### `expect.matches(regex)`
### `expect.matchesObject(object)`
### `expect.satisfies(fn[, message])`

## Mock functions

### `mockFn([fn])`
### `mockFn().returns(value)`
### `mockFn().throws([error])`
### `mockFn().resolves()`
### `mockFn().resolvesWith(value)`
### `mockFn().rejects()`
### `mockFn().rejectsWith(error)`
### `mockFn().returnsOnce(value)`
### `mockFn().throwsOnce([error])`
### `mockFn().resolvesOnce()`
### `mockFn().resolvesOnceWith(value)`
### `mockFn().rejectsOnce()`
### `mockFn().rejectsOnceWith(error)`
