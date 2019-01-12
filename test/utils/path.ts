import { expect } from 'chai'
import { joinPath, parsePath } from '../../src/utils'

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

describe('parsePath', () => {
  it('parses normal paths', () => {
    expect(parsePath('a.b')).to.deep.equal(['a', 'b'])
    expect(parsePath('a123bC')).to.deep.equal(['a123bC'])
  })

  it('parses paths with numbers', () => {
    expect(parsePath('a[1].b')).to.deep.equal(['a', '1', 'b'])
    expect(parsePath('[2].c[3]')).to.deep.equal(['2', 'c', '3'])
  })

  it('parses paths with weird properties', () => {
    expect(parsePath('["a\\"x"]')).to.deep.equal(['a"x'])
    expect(parsePath('["a\\\\"]')).to.deep.equal(['a\\'])
    expect(parsePath('a["^*&bzz"][2].d3')).to.deep.equal(['a', '^*&bzz', '2', 'd3'])
  })

  it('throws for invalid paths', () => {
    expect(() => parsePath('')).to.throw(SyntaxError)
    expect(() => parsePath('1a')).to.throw(SyntaxError)
    expect(() => parsePath('a-b')).to.throw(SyntaxError)
    expect(() => parsePath('a[1]b')).to.throw(SyntaxError)
    expect(() => parsePath('[1')).to.throw(SyntaxError)
    expect(() => parsePath('a1]')).to.throw(SyntaxError)
    expect(() => parsePath('&^&')).to.throw(SyntaxError)
    expect(() => parsePath('["\\d"]')).to.throw(SyntaxError)
    expect(() => parsePath('["\\')).to.throw(SyntaxError)
  })
})
