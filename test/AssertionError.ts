import { expect } from 'chai';
import { AssertionError } from '../src/AssertionError';

describe('AssertionError', () => {
  it('can be constructed', () => {
    const error = new AssertionError('message', 'expected', 'actual');
    expect(error.name).to.equal('AssertionError');
    expect(error.message).to.equal('message');
    expect(error.expected).to.equal('expected');
    expect(error.actual).to.equal('actual');
    expect(error instanceof AssertionError).to.equal(true);
  });
});
