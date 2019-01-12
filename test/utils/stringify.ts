import { expect } from 'chai'
import { stringify } from '../../src/utils'

const namedLambda = () => {}
const nullProtoXY: any = Object.create(null)
nullProtoXY.x = 1
nullProtoXY.y = 2

const circular1: any = {}
circular1.x = circular1

const circular2: any = { x: {} }
circular2.x.x = circular2

const circular3: any[] = []
circular3[0] = circular3

const obj = {}

class MyClass {
  x = 1
}
const myClassInstance = new MyClass()

const cases: [any, string][] = [
  [1, '1'],
  [234, '234'],
  [-2, '-2'],
  [0, '0'],
  [-0, '-0'], // Yes, JavaScript has +0 and -0
  [0.1, '0.1'],
  [-0.1, '-0.1'],
  [3.1415, '3.1415'],
  [-3.1415, '-3.1415'],
  [1.23e+64, '1.23e+64'],
  [1.23e-64, '1.23e-64'],

  [NaN, 'NaN'],
  [Infinity, 'Infinity'],
  [-Infinity, '-Infinity'],

  [null, 'null'],
  [undefined, 'undefined'],

  ['hello', '"hello"'],
  [true, 'true'],
  [false, 'false'],

  [Symbol(), 'Symbol()'],
  [Symbol('asd'), 'Symbol(asd)'],

  [namedLambda, 'Function(namedLambda)'],
  [function aaa() {}, 'Function(aaa)'],
  [function () {}, 'Function'],
  [() => {}, 'Function'],

  [[], '[]'],
  [[1, null, 'hello', () => {}], '[1, null, "hello", Function]'],
  ['1234567'.split(''), '["1", "2", "3", "4", "5", "6", "7"]'],
  [[1, [2, [3]]], '[1, [2, [3]]]'],
  [[{ a: [1] }], '[{ a: [1] }]'],

  [new Error(), 'Error'],
  [new Error('asd'), 'Error("asd")'],
  [new TypeError, 'TypeError'],
  [new TypeError('asd'), 'TypeError("asd")'],

  [Object.create(null), '{ (null prototype) }'],
  [nullProtoXY, '{ (null prototype) x: 1, y: 2 }'],
  [{}, '{}'],
  [{ b: 1, a: '3' }, '{ a: "3", b: 1 }'],

  [circular1, '{ x: <Circular> }'],
  [circular2, '{ x: { x: <Circular> } }'],
  [circular3, '[<Circular>]'],
  [[circular1, circular3], '[{ x: <Circular> }, [<Circular>]]'],
  [[obj, obj], '[{}, {}]'],

  [myClassInstance, 'MyClass { x: 1 }'],
  [[myClassInstance], '[MyClass { x: 1 }]'],

  [new String('asd'), 'String("asd")'],
  [new Number(12), 'Number(12)'],
  [new Boolean(false), 'Boolean(false)'],

  [Promise.resolve(1), 'Promise {}'],
  [new Date(0), 'Date(1970-01-01T00:00:00.000Z)']
]

describe('stringify', () => {
  for (const [value, representation] of cases) {
    it(`works for ${representation}`, () => {
      const result = stringify(value)
      expect(result).to.equal(representation)
    })
  }
})
