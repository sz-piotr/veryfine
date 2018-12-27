import { expect } from 'chai'
import { joinPath } from '../../src/utils/path'

describe('joinPath', () => {
  it('joins normal properties', () => {
    expect(joinPath('', 'a')).to.equal('.a')
    expect(joinPath('.b[3]', 'a')).to.equal('.b[3].a')
    expect(joinPath('.x', 'a123cD')).to.equal('.x.a123cD')
  })

  it('joins number properties', () => {
    expect(joinPath('', 1)).to.equal('[1]')
    expect(joinPath('.b[3]', '1')).to.equal('.b[3][1]')
    expect(joinPath('.x', '123')).to.equal('.x[123]')
  })

  it('joins weird properties', () => {
    expect(joinPath('', '"x&')).to.equal('["\\"x&"]')
    expect(joinPath('.b[3]', '"x&')).to.equal('.b[3]["\\"x&"]')
    expect(joinPath('.x', '"x&')).to.equal('.x["\\"x&"]')
  })
})
