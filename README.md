# Veryfine

A delightful expect-style assertion and mocking library

## Core features

1. Intelligent deep equality checking

```javascript
import { expect } from 'veryfine'

const nestedValue = {
  exactly: 1,
  instance: new Error('hello'),
  truthy: 'yip',
  whatever: null,
  deep: [1, { deeper: true }],
  array: [1, 2, 3],
}

expect(nestedValue).equals({
  exactly: 1,
  instance: expect.instanceOf(Error),
  truthy: expect.truthy,
  whatever: expect.any,
  deep: [
    expect.any,
    { deeper: true }
  ],
  array: expect.arrayOf(expect.number)
})

expect(1).equals(expect.number)
```

2. Mock functions

```javascript
import { expect, mockFn } from 'veryfine'

const myMock = mockFn()
myMock('hi')

expect(myMock).calledWith('hi')
expect(myMock).calledOnce()
```

3. Simple extensibility

```javascript
import { expect } from 'veryfine'

function likesTrains(person) {
  return person && person.likesTrains
}

const me = {
  likesTrains: false
}

expect(me, likesTrains)
// AssertionError: likesTrains({ likesTrains: false }) returned false
```
