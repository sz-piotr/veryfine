import { mockFn } from '../src'
import { expect } from 'chai'

describe('mockFn', () => {
  it('returns undefined', () => {
    const fn = mockFn()

    expect(fn()).to.equal(undefined)
  })

  it('records calls', () => {
    const fn = mockFn()

    expect(fn.calls).to.deep.equal([])

    fn(1, 2)
    fn('hello')

    expect(fn.calls).to.deep.equal([
      [1, 2],
      ['hello']
    ])
  })

  it('validates the argument', () => {
    expect(() => mockFn(123 as any)).to.throw(TypeError)
  })

  it('can have an implementation', () => {
    const fn = mockFn((x: number) => x + 1)

    const result1 = fn(3)
    const result2 = fn(15)

    expect(result1).to.equal(4)
    expect(result2).to.equal(16)
  })

  describe('.returns', () => {
    it('overrides the implementation', () => {
      const fn = mockFn((x: number) => x + 1)
      fn.returns('hi')

      expect(fn()).to.equal('hi')
      expect(fn()).to.equal('hi')
    })

    it('returns the mock', () => {
      const fn = mockFn().returns('hello')
      expect(fn()).to.equal('hello')
    })
  })

  describe('.returnsOnce', () => {
    it('overrides the implementation for a single call', () => {
      const fn = mockFn((x: number) => x + 1)
      fn.returnsOnce('hi')

      expect(fn()).to.equal('hi')
      expect(fn(3)).to.equal(4)
    })

    it('returns the mock', () => {
      const fn = mockFn().returnsOnce('hello')
      expect(fn()).to.equal('hello')
      expect(fn()).to.equal(undefined)
    })

    it('can be chained', () => {
      const fn = mockFn()
        .returnsOnce('hello')
        .returnsOnce(42)

      expect(fn()).to.equal('hello')
      expect(fn()).to.equal(42)
      expect(fn()).to.equal(undefined)
      expect(fn()).to.equal(undefined)
    })
  })

  describe('.throws', () => {
    it('overrides the implementation', () => {
      const fn = mockFn((x: number) => x + 1)
      fn.throws()

      expect(fn).to.throw()
      expect(fn).to.throw()
    })

    it('returns the mock', () => {
      const fn = mockFn().throws()
      expect(fn).to.throw()
    })

    it('can throw a specific error', () => {
      const fn = mockFn().throws(new TypeError('foo'))
      expect(fn).to.throw(TypeError, 'foo')
    })
  })

  describe('.throwsOnce', () => {
    it('overrides the implementation for a single call', () => {
      const fn = mockFn((x: number) => x + 1)
      fn.throwsOnce()

      expect(fn).to.throw()
      expect(fn(3)).to.equal(4)
    })

    it('returns the mock', () => {
      const fn = mockFn().throwsOnce()
      expect(fn).to.throw()
      expect(fn()).to.equal(undefined)
    })

    it('can throw a specific error', () => {
      const fn = mockFn().throwsOnce(new TypeError('foo'))
      expect(fn).to.throw(TypeError, 'foo')
    })

    it('can be chained', () => {
      const fn = mockFn()
        .throwsOnce(new TypeError('foo'))
        .throwsOnce(new SyntaxError('bar'))

      expect(fn).to.throw(TypeError, 'foo')
      expect(fn).to.throw(SyntaxError, 'bar')
      expect(fn()).to.equal(undefined)
      expect(fn()).to.equal(undefined)
    })
  })

  describe('.resolves', () => {
    it('overrides the implementation', async () => {
      const fn = mockFn((x: number) => x + 1)
      fn.resolves()

      expect(fn()).to.be.instanceOf(Promise)
      expect(await fn()).equal(undefined)
    })

    it('returns the mock', () => {
      const fn = mockFn().resolves()
      expect(fn()).to.be.instanceOf(Promise)
    })

    it('can resolve with a specific value', async () => {
      const fn = mockFn().resolves(42)
      expect(await fn()).to.equal(42)
    })
  })

  describe('.resolvesOnce', () => {
    it('overrides the implementation for a single call', async () => {
      const fn = mockFn((x: number) => x + 1)
      fn.resolvesOnce()

      expect(fn()).to.be.instanceOf(Promise)
      expect(fn(3)).equal(4)
    })

    it('returns the mock', () => {
      const fn = mockFn().resolvesOnce()
      expect(fn()).to.be.instanceOf(Promise)
    })

    it('can resolve with a specific value', async () => {
      const fn = mockFn().resolvesOnce(42)
      expect(await fn()).to.equal(42)
    })

    it('can be chained', async () => {
      const fn = mockFn()
        .resolvesOnce('hello')
        .resolvesOnce(42)

      expect(await fn()).to.equal('hello')
      expect(await fn()).to.equal(42)
      expect(fn()).to.equal(undefined)
      expect(fn()).to.equal(undefined)
    })
  })

  describe('.rejects', () => {
    it('overrides the implementation', async () => {
      const fn = mockFn((x: number) => x + 1)
      fn.rejects()

      expect(await fn().catch(() => true)).to.equal(true)
      expect(await fn().catch(() => true)).to.equal(true)
    })

    it('returns the mock', async () => {
      const fn = mockFn().rejects()
      expect(await fn().catch(() => true)).to.equal(true)
    })

    it('can reject with a specific value', async () => {
      const fn = mockFn().rejects(42)
      expect(await fn().catch((x: any) => x)).to.equal(42)
    })
  })

  describe('.rejectsOnce', () => {
    it('overrides the implementation for a single call', async () => {
      const fn = mockFn((x: number) => x + 1)
      fn.rejectsOnce()

      expect(await fn().catch(() => true)).to.equal(true)
      expect(fn(3)).to.equal(4)
    })

    it('returns the mock', async () => {
      const fn = mockFn().rejectsOnce()
      expect(await fn().catch(() => true)).to.equal(true)
    })

    it('can reject with a specific value', async () => {
      const fn = mockFn().rejectsOnce(42)
      expect(await fn().catch((x: any) => x)).to.equal(42)
    })

    it('can be chained', async () => {
      const fn = mockFn()
        .rejectsOnce('hello')
        .rejectsOnce(42)

      expect(await fn().catch((x: any) => x)).to.equal('hello')
      expect(await fn().catch((x: any) => x)).to.equal(42)
      expect(fn()).to.equal(undefined)
      expect(fn()).to.equal(undefined)
    })
  })

  it('allows complex chaining', async () => {
    const fn = mockFn()
      .returnsOnce(3)
      .throwsOnce(new TypeError('foo'))
      .resolvesOnce('hello')
      .rejectsOnce(new SyntaxError('bar'))
      .returns(true)

    expect(fn()).to.equal(3)
    expect(fn).to.throw(TypeError, 'foo')
    expect(await fn()).to.equal('hello')
    expect(await fn().catch((x: any) => x)).to.be.instanceOf(SyntaxError)

    expect(fn()).to.equal(true)
    expect(fn()).to.equal(true)
  })
})
