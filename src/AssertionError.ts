export class AssertionError extends Error {
  name = 'AssertionError';
  expected: any;
  actual: any;

  constructor(
    message: string,
    expected: any,
    actual: any,
    startStackFunction: Function = AssertionError,
  ) {
    super(message);
    this.expected = expected;
    this.actual = actual;

    if ((<any>Error).captureStackTrace) {
      (<any>Error).captureStackTrace(this, startStackFunction);
    } else {
      try {
        throw new Error();
      } catch (e) {
        this.stack = e.stack;
      }
    }
  }
}
