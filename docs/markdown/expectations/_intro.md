Expectations are special purpose functions that can be used alongside `.toEqual` when checking object deep equality. Sometimes you don't want specify directly a value that you check. Expectations allow you to say something about the value without necessarily specifying the value itself.

Sometimes it is useful to test that some expectation fails for a value. To do
this use `.not` before you call the validator.

Below is a list of all the expectations for your convinience:

- [`anything`](#expectations-anything)
- [`toStrictlyEqual`](#expectations-tostrictlyequal)
- [`toBeInstanceOf`](#expectations-tobeinstanceof)
- [`toHaveTypeOf`](#expectations-tohavetypeof)
- [`toBeTruthy`](#expectations-tobetruthy)
- [`toBeFalsy`](#expectations-tobefalsy)
- [`toBeGreaterThan`](#expectations-tobegreaterthan)
- [`toBeGreaterThanOrEqual`](#expectations-tobegreaterthanorequal)
- [`toBeLessThan`](#expectations-tobelessthan)
- [`toBeLessThanOrEqual`](#expectations-tobelessthanorequal)
- [`toBeCloseTo`](#expectations-tobecloseto)
- [`toHaveProperty`](#expectations-tohaveproperty)
- [`toMatch`](#expectations-tomatch)
- [`toMatchObject`](#expectations-tomatchobject)
- [`toSatisfy`](#expectations-tosatisfy)
