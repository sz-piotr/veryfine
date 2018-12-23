Verifiers are the bread and butter of the Verifine library. They allow you
to make assertions about your code and aid you in writing readable tests.

Using verifiers is easy. Call the `expect` function with a value and then
call a method like [`.toEqual`](#verifiers-toequal) on the result.
If the check is not successful an exception will be thrown. Simple, right?

Below is a list of all the verifiers for your convinience:

- [`toEqual`](#verifiers-toequal)
- [`toStrictlyEqual`](#verifiers-tostrictlyequal)
- [`toBeInstanceOf`](#verifiers-tobeinstanceof)
- [`toHaveTypeOf`](#verifiers-tohavetypeof)
- [`toBeTruthy`](#verifiers-tobetruthy)
- [`toBeFalsy`](#verifiers-tobefalsy)
- [`toBeGreaterThan`](#verifiers-tobegreaterthan)
- [`toBeGreaterThanOrEqual`](#verifiers-tobegreaterthanorequal)
- [`toBeLessThan`](#verifiers-tobelessthan)
- [`toBeLessThanOrEqual`](#verifiers-tobelessthanorequal)
- [`toBeCloseTo`](#verifiers-tobecloseto)
- [`toHaveProperty`](#verifiers-tohaveproperty)
- [`toMatch`](#verifiers-tomatch)
- [`toMatchObject`](#verifiers-tomatchobject)
- [`toThrow`](#verifiers-tothrow)
- [`toBeResolved`](#verifiers-toberesolved)
- [`toBeRejected`](#verifiers-toberejected)
- [`toBeRejectedWith`](#verifiers-toberejectedwith)
- [`toSatisfy`](#verifiers-tosatisfy)
