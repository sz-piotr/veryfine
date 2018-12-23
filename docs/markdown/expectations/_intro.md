Expectations are special purpose functions that can be used alongside `.toEqual` when checking object deep equality. Sometimes you don't want specify directly a value that you check. Expectations allow you to say something about the value without necessarily specifying the value itself.

All expectations can be combined with the `.not` modifier.

Below is a list of all the expectations for your convinience:

- [`anything`](#expectations-anything)
- [`strictlyEqual`](#expectations-strictlyequal)
- [`instanceOf`](#expectations-instanceof)
- [`type`](#expectations-type)
- [`truthy`](#expectations-truthy)
- [`falsy`](#expectations-falsy)
- [`greaterThan`](#expectations-greaterthan)
- [`greaterThanOrEqual`](#expectations-greaterthanorequal)
- [`lessThan`](#expectations-lessthan)
- [`lessThanOrEqual`](#expectations-lessthanorequal)
- [`closeTo`](#expectations-closeto)
- [`hasProperty`](#expectations-hasproperty)
- [`matches`](#expectations-matches)
- [`matchesObject`](#expectations-matchesobject)
- [`satisfies`](#expectations-satisfies)
