### `.toBeCalled()`

Use `.toBeCalled` to check if a [mock function](#mocks) was called at least once.

#### Examples

```javascript
import { expect, mockFn } from 'veryfine'

const fn = mockFn()

// fails if the mock was never called
expect(fn).not.toBeCalled()

// passes when the mock was called at least once
fn()
expect(fn).toBeCalled()

// non-mock values always fail
expect('def').not.toBeCalled()
expect(null).not.toBeCalled()
expect(123).not.toBeCalled()
expect(function () {}).not.toBeCalled()
```
