export class AssertionError extends Error {
  expected: any;
  actual: any;

  constructor(
    message: string,
    expected: any,
    actual: any,
  ) {
    super(message);
    overridePrototype(this, AssertionError.prototype);

    this.expected = expected;
    this.actual = actual;

    try {
      const stackLines = this.stack!.split('\n');
      let cutIndex = -Infinity;
      for (let i = stackLines.length - 1; i >= 0; i--) {
        if (/\s+at Expect/.test(stackLines[i])) {
          cutIndex = i;
          break;
        }
      }
      this.stack = stackLines.filter((line, index) =>
        !/\s+at/.test(line) || index >= cutIndex
      ).join('\n');
    } catch (e) {
      // Stack manipulation may fail
    }
  }
}

AssertionError.prototype.name = 'AssertionError';

function overridePrototype(instance: any, to: any) {
  if ((Object as any).setPrototypeOf) {
    (Object as any).setPrototypeOf(instance, to);
  } else {
    instance.__proto__ = to;
  }
}
