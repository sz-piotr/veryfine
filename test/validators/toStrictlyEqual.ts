import { expect } from '../../src';
import { expect as doExpect } from 'chai';
import { AssertionError } from '../../src/AssertionError';

describe('.toStrictlyEqual', () => {
  it('passes when values are strictly equal', () => {
    expect(1).toStrictlyEqual(1);
    expect('hello').toStrictlyEqual('hello');
    expect(false).toStrictlyEqual(false);
    expect(+0).toStrictlyEqual(-0);
    const obj = {}
    expect(obj).toStrictlyEqual(obj);
  });

  it('fails when values are not strictly equal', () => {
    doExpect(() => {
      expect(1).toStrictlyEqual('world');
    }).to.throw(AssertionError);

    doExpect(() => {
      expect(false).toStrictlyEqual({ x: 1 });
    }).to.throw(AssertionError);

    doExpect(() => {
      expect({ x: 1 }).toStrictlyEqual({ x: 1 });
    }).to.throw(AssertionError);

    doExpect(() => {
      expect(NaN).toStrictlyEqual(NaN);
    }).to.throw(AssertionError);
  });

  it('can be negated', () => {
    expect(1).not.toStrictlyEqual(2);

    doExpect(() => {
      expect(1).not.toStrictlyEqual(1);
    }).to.throw(AssertionError);
  })
});
