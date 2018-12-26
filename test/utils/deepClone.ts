import { expect } from 'chai'
import { deepClone } from '../../src/utils/deepClone'

describe('deepClone', () => {
  it('returns primitives intact', () => {
    expect(deepClone(1)).to.equal(1)
    expect(deepClone('string')).to.equal('string')
    expect(deepClone(true)).to.equal(true)
    expect(deepClone(null)).to.equal(null)
    expect(deepClone(undefined)).to.equal(undefined)
  })

  it('clones objects', () => {
    const object = { a: 1, b: 'foo' }
    expect(deepClone(object)).to.deep.equal(object)
    expect(deepClone(object)).not.to.equal(object)
  })

  it('clones objects deeply', () => {
    const object = { a: 1, b: { c: 2, d: 3 } }
    expect(deepClone(object)).to.deep.equal(object)
    expect(deepClone(object)).not.to.equal(object)
    expect(deepClone(object).b).not.to.equal(object.b)
  })

  it('handles circular references in objects', () => {
    const object: any = {}
    object.self = object

    expect(deepClone(object)).to.deep.equal(object)
    expect(deepClone(object)).not.to.equal(object)
  })

  it('clones array', () => {
    const array = [1, 2]

    expect(deepClone(array)).to.deep.equal(array)
    expect(deepClone(array)).not.to.equal(array)
  })

  it('clones arrays deeply', () => {
    const array = [1, [2, 3]]

    expect(deepClone(array)).to.deep.equal(array)
    expect(deepClone(array)).not.to.equal(array)
    expect(deepClone(array)[1]).not.to.equal(array[1])
  })

  it('handles circular references in arrays', () => {
    const array: any[] = []
    array.push(array)

    expect(deepClone(array)).to.deep.equal(array)
    expect(deepClone(array)).not.to.equal(array)
  })

  it('handles complex circular structures', () => {
    const complex: any[] = [
      { x: 1, nested: { a: 1, b: [1, 2] } },
      []
    ]
    complex[0].nested.b.push(complex)
    complex[1].push(complex[0])

    expect(deepClone(complex)).to.deep.equal(complex)
    expect(deepClone(complex)).not.to.equal(complex)
  })
})
