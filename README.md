# Veryfine

Veryfine is a delightful expect-style assertion and mocking library for JavaScript.
It is intended for use with Mocha. Main features include: intelligent deep equality
checking, built-in mock functions and hassle-free custom matchers.
[Check out the documentation](https://veryfine.netlify.com/docs)!

## Install

With yarn
```
yarn add veryfine
```

Or with npm
```
npm install veryfine
```

## Use

Veryfine was made to be used with [Mocha](https://mochajs.org/), but can be
used in any javascript environment.

```javascript
import { expect } from 'veryfine'

describe('how awesome veryfine is', () => {
  it('is so amazing', () => {
    const you = { satisfaction: Infinity }
    expect(you.satisfaction).toBeGreaterThan(9000)
  });
});
```

## Learn more

Read the excellent documentation at [the Veryfine website](https://veryfine.netlify.com/docs).
