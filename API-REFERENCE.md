# Veryfine - API Reference

## Verifiers

### `.toEqual(value)`

Use `toEqual` to check for deep equality of values. Additionally `toEqual`
supports using [expectations](#expectations). To check for strict equality (`===`) use `.toStrictlyEqual`.

Two values are deeply equal if and only if one of the following is true:
  - Object.is returns true when comparing them
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
### `.toBeInstanceOf(class)`
### `.toHaveTypeOf(string)`
### `.toBeTruthy()`
### `.toBeFalsy()`
### `.toBeGreaterThan(number)`
### `.toBeGreaterThanOrEqualTo(number)`
### `.toBeLessThan(number)`
### `.toBeLessThanOrEqualTo(number)`
### `.toBeCloseTo(number[, precision])`
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

### `expect.anything()`
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
