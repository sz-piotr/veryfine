import { expect } from '../../src'
import { expect as chaiExpect } from 'chai'
import { AssertionError } from '../../src/AssertionError'

describe('.toEqual', () => {
  it('passes when Object.is returns true for primitives', () => {
    expect(1).toEqual(1)
    expect(true).toEqual(true)
    expect('hello').toEqual('hello')
    expect(null).toEqual(null)
    expect(undefined).toEqual(undefined)
    expect(NaN).toEqual(NaN)
    expect(0).toEqual(0)
  })

  it('fails when Object.is returns false for primitives', () => {
    chaiExpect(() => {
      expect(1).toEqual(2)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect(-0).toEqual(+0)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect(1).toEqual('hello')
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect(undefined).toEqual(null)
    }).to.throw(AssertionError)
  })

  it('passes when objects are deeply equal', () => {
    expect({}).toEqual({})
    expect({ x: 1 }).toEqual({ x: 1 })
    expect({ a: 'a', b: 2 }).toEqual({ a: 'a', b: 2 })
    expect({ x: undefined }).toEqual({ x: undefined })
    expect({ a: 1, b: { c: 1, d: 2 } }).toEqual({ a: 1, b: { c: 1, d: 2 } })
  })

  it('fails when objects are not deeply equal', () => {
    chaiExpect(() => {
      expect({}).toEqual(123)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect({}).toEqual(null)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect({ x: 1 }).toEqual({})
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect({ x: 1 }).toEqual({ x: 1, y: 2 })
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect({ x: 1 }).toEqual({ a: 'a', b: 2 })
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect({ x: undefined }).toEqual({})
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect({}).toEqual({ x: undefined })
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect({ a: 1, b: { c: 1, d: 2 } }).toEqual({ a: 1, b: { c: 1, d: 3 } })
    }).to.throw(AssertionError)
  })

  it('passes when arrays are deeply equal', () => {
    expect([]).toEqual([])
    expect([1]).toEqual([1])
    expect(['a', 2]).toEqual(['a', 2])
    expect([undefined]).toEqual([undefined])
    expect([1, [2, 3]]).toEqual([1, [2, 3]])
  })

  it('fails when arrays are not deeply equal', () => {
    chaiExpect(() => {
      expect([]).toEqual({})
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect([]).toEqual(null)
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect([]).toEqual('hello')
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect([1]).toEqual([])
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect([1]).toEqual([])
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect([1, 2]).toEqual([1])
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect([1, 2]).toEqual(['a', 2])
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect([undefined]).toEqual([])
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect([]).toEqual([undefined])
    }).to.throw(AssertionError)

    chaiExpect(() => {
      expect([1, [2, 3]]).toEqual([1, [2, 4]])
    }).to.throw(AssertionError)
  })

  it('passes when complex objects are deeply equal', () => {
    expect([{ x: 1, y: [{}] }]).toEqual([{ x: 1, y: [{}] }])
  })

  it('fails when complex objects are not deeply equal', () => {
    chaiExpect(() => {
      expect([{ x: 1, y: [{}] }]).toEqual([{ x: 1, z: [{}] }])
    }).to.throw(AssertionError)
  })

  it('supports basic circular references', () => {
    const a: any = {}
    a.x = a
    const b: any = {}
    b.x = b
    const c: any = { y: 1 }
    c.x = c

    expect(a).toEqual(b)
    expect([a]).toEqual([b])
    expect({ one: a, two: b }).toEqual({ one: b, two: a })

    chaiExpect(() => {
      expect(a).toEqual(c)
    }).to.throw(AssertionError)
  })

  it('supports advanced circular references', () => {
    const a: any = {}
    a.x = a
    const b: any = { x: {} }
    b.x.x = b

    // This is by design
    // Checking cases like this would massively overcomplicate the code

    expect(a).not.toEqual(b)
    expect(b).not.toEqual(a)
  })

  it('provides', () => {
    const a: any = {}
    a.x = a
    const b: any = { x: {} }
    b.x.x = b

    // This is by design
    // Checking cases like this would massively overcomplicate the code

    expect(a).not.toEqual(b)
    expect(b).not.toEqual(a)
  })

  it('can be negated', () => {
    expect(1).not.toEqual(2)

    chaiExpect(() => {
      expect(1).not.toEqual(1)
    }).to.throw(AssertionError)
  })

  it('produces helpful errors', () => {
    let err: Error | undefined
    try {
      expect({
        foo: 1,
        '*+"bzz"+*': [],
        nested: [
          { x: 1, y: 2 },
          'nom nom',
          3
        ]
      }).toEqual({
        bar: 1,
        '*+"bzz"+*': [1],
        nested: [
          { x: 2 },
          false
        ]
      })
    } catch (e) {
      err = e
    }
    const lines = err!.message.split('\n').slice(1).map(x => x.trim())

    chaiExpect(lines).to.deep.equal([
      '- .bar | property missing',
      '- .foo | property should not be present',
      '- .nested | expected length 2, received 3',
      '- .nested[0].x | expected 2, received 1',
      '- .nested[0].y | property should not be present',
      '- .nested[1] | expected type boolean, received string',
      '- .nested[2] | item should not be present',
      '- ["*+\\"bzz\\"+*"] | expected length 1, received 0',
      '- ["*+\\"bzz\\"+*"][0] | item missing'
    ])
  })
})
