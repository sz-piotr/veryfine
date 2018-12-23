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
