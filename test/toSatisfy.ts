import { expect } from '../src';
import { expect as doExpect } from 'chai';
import { AssertionError } from '../src/AssertionError';

describe('.toSatisfy', () => {
  it('fn recieves checked value as argument', () => {
    let value;
    expect(1).toSatisfy((arg) => {
      value = arg;
      return true;
    });
    doExpect(value).to.equal(1);
  });

  it('passes when fn returns true', () => {
    expect(1).toSatisfy(() => true);
  });

  xit('passes when fn returns a Promise<true>', async () => {
    await expect(1).toSatisfy(() => Promise.resolve(true));
  });

  xit('fails when negated and fn returns a Promise<true>', async () => {
    let error;
    try {
      await expect(1).not.toSatisfy(() => Promise.resolve(true));
    } catch (e) {
      error = e;
    }
    doExpect(error).to.be.instanceOf(AssertionError);
  });

  it('fails when negated and fn returns true', () => {
    doExpect(() => {
      expect(1).not.toSatisfy(() => true);
    }).to.throw(AssertionError);
  });

  it('fails when fn does not return true', () => {
    doExpect(() => {
      expect(1).toSatisfy(() => false);
    }).to.throw(AssertionError);
  });

  it('passes when negated fn does not return true', () => {
    doExpect(() => {
      expect(1).not.toSatisfy(() => false);
    }).not.to.throw();
  });

  it('propagates thrown errors', () => {
    const err = new Error('foo');
    doExpect(() => {
      expect(1).toSatisfy(() => { throw err; });
    }).to.throw(err);

    doExpect(() => {
      expect(1).not.toSatisfy(() => { throw err; });
    }).not.to.throw();
  });
});
