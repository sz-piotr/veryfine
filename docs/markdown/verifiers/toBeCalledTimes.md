### `.toBeCalledTimes(count)`

Use `.toBeCalledTimes` to check if a [mock function](#mocks) was called a specific
number of times.

#### Examples

```javascript
import { expect, mockFn } from 'veryfine'

const fn = mockFn()
fn()
fn()

// passes when the mock was called the specified number of times
expect(fn).toBeCalledTimes(2)

// fails if the mock wasn't called the specified number of times
expect(fn).not.toBeCalledTimes(0)
expect(fn).not.toBeCalledTimes(1)
expect(fn).not.toBeCalledTimes(3)

// non-mock values always fail
expect('def').not.toBeCalledTimes(1)
expect(null).not.toBeCalledTimes(1)
expect(123).not.toBeCalledTimes(1)
expect(function () {}).not.toBeCalledTimes(1)
```
