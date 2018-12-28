### `.toBeCalledWith()`

Use `.toBeCalledWith` to check if a [mock function](#mocks) was called at least
once with the specified arguments. Arguments are compared using
[`.toEqual`](#verifiers-toequal).

#### Examples

```javascript
import { expect, mockFn } from 'veryfine'

const fn = mockFn()
fn(1)
fn('hi', { x: 1, y: 2 })

// fails if the mock was never called with given arguments
expect(fn).not.toBeCalledWith(2)

// passes when the mock was called at least once with given arguments
expect(fn).toBeCalledWith(1)
expect(fn).toBeCalledWith('hi', { x: 1, y: 2 })

// expectations are supported
expect(fn).toBeCalledWith(
  expect.type('string'),
  { x: expect.anything(), y: 2 }
)

// non-mock values always fail
expect('def').not.toBeCalledWith()
expect(null).not.toBeCalledWith()
expect(123).not.toBeCalledWith()
expect(function () {}).not.toBeCalledWith()
```
