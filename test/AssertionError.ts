import { expect } from 'chai';
import { AssertionError } from '../src/AssertionError';

describe('AssertionError', () => {
  // tslint:disable-next-line
  it('can be constructed without startStackFunction', function someFunc() {
    const error = new AssertionError('message', 'expected', 'actual');
    expect(error.name).to.equal('AssertionError');
    expect(error.message).to.equal('message');
    expect(error.expected).to.equal('expected');
    expect(error.actual).to.equal('actual');
    expect(error.stack).to.include('someFunc');
  });

  it('can be constructed with startStackFunction', function someFunc() {
    const error = new AssertionError('message', 'expected', 'actual', someFunc);
    expect(error.name).to.equal('AssertionError');
    expect(error.message).to.equal('message');
    expect(error.expected).to.equal('expected');
    expect(error.actual).to.equal('actual');
    expect(error.stack).not.to.include('someFunc');
  });
});
