import { fail } from './fail';

export function expect(value: any) {
  return new Expect(value);
}

class Expect {
  private value: any;
  private negated = false;

  constructor(value: any) {
    this.value = value;
  }

  get not() {
    if (!this.negated) {
      this.negated = true;
    } else {
      throw new TypeError('Cannot negate an already negated validator.');
    }
    return this;
  }

  toSatisfy(fn: (value: any) => void, message?: string): void;
  toSatisfy(fn: (value: any) => Promise<void>, message?: string): Promise<void>;
  toSatisfy(fn: (value: any) => any, message?: string): any {
    const name = (fn as any).name || 'toSatisfy';

    let result;
    try {
      result = fn(this.value);
    } catch (e) {
      if (!this.negated) {
        throw e;
      } else {
        return;
      }
    }

    if (result !== true && !this.negated) {
      fail(`${name} check failed`);
    } else if (result === true && this.negated) {
      fail(`${name} check succeded, but was expected to fail`);
    }
  }
}
