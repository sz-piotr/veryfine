### `expect.anything()`

Use `expect.anything()` when you expect a value to be present.
Always fails when negated.

#### Examples

```javascript
// any value including undefined works
expect({ x: 1 }).toEqual({ x: expect.anything() });
expect({ x: undefined }).toEqual({ x: expect.anything() });

// missing values are not satisfactory
expect({}).not.toEqual({ x: expect.anything() });
expect([]).not.toEqual([expect.anything()]);

// always fails when negated
expect({ x: 1 }).toEqual({ x: expect.not.anything() });
```
