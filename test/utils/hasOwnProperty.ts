import { expect } from 'chai'
import { hasOwnProperty } from '../../src/utils/hasOwnProperty'

describe('hasOwnProperty', () => {
  it('returns true when objects have own property', () => {
    expect(hasOwnProperty({ a: 1 }, 'a')).to.equal(true)
  })

  it('returns false when objects dont have own property', () => {
    expect(hasOwnProperty(Object.create(null), 'a')).to.equal(false)
    expect(hasOwnProperty({}, 'a')).to.equal(false)
    expect(hasOwnProperty({}, 'toString')).to.equal(false)
  })

  it('returns false when value is not an object', () => {
    expect(hasOwnProperty(null, 'a')).to.equal(false)
    expect(hasOwnProperty(3, 'toString')).to.equal(false)
  })
})
