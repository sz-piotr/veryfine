import { fail, expect } from '../src';
import { expect as doExpect } from 'chai';
import { AssertionError } from '../src/AssertionError';

describe('fail', () => {
  it('throws an AssertionError', () => {
    doExpect(fail).to.throw(AssertionError);
  });

  it('correctly manipulates stack traces for custom methods', async () => {
    function check() {
      return async function () {
        fail('multiline\nmessage');
      };
    }
    let err;
    try {
      await expect(1).toSatisfy(check());
    } catch (e) {
      err = e;
    }
    doExpect(err.stack).to.match(/^AssertionError: multiline\nmessage/);
    doExpect(err.stack).to.match(/at Expect.toSatisfy/);
    doExpect(err.stack).not.to.match(/check/);
  });

  it('correctly manipulates stack traces for built ins', async () => {
    let err;
    try {
      expect(1).toStrictlyEqual(2);
    } catch (e) {
      err = e;
    }
    doExpect(err.stack).to.match(/at Expect.toStrictlyEqual/);
    doExpect(err.stack).not.to.match(/at Expect.toSatisfy/);
  });
});
