import { expect } from 'chai';
import { hello } from '../src';

it('works', () => {
  expect(hello()).to.equal('world');
});
