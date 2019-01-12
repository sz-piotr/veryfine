import { expect } from '../../src'
import { CHECK_EXPECTATION } from '../validators/utils'

const cases = [
  13,
  'abc',
  false,
  {},
  [],
  null
]

describe('expect.anything()', () => {
  for (const value of cases) {
    const caseStr = JSON.stringify(value)

    CHECK_EXPECTATION(true, caseStr, () => {
      const expectation = expect.anything()
      return expectation(value)
    })

    CHECK_EXPECTATION(false, 'negated and ' + caseStr, () => {
      const expectation = expect.not.anything()
      return expectation(value)
    })
  }
})
