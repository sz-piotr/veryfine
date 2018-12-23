### `expect.anything()`

Use `expect.anything()` when you expect a value to be present. This will only
fail when the property is not present.

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
